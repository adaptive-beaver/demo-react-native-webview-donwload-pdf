import React from 'react';
import {
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob'

// rn-fetch-blog Docs: https://github.com/joltup/rn-fetch-blob#user-content-installation
// Stack Overflow post on React-Native WebView + RNFetchBlob + PDF Download: https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native

const urlWithLinkToPDF = "https://topherpedersen.blog/2021/09/29/how-to-download-a-pdf-from-a-webview-in-react-native/";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onShouldStartLoadWithRequest = (request) => {
    if (request.url.includes(".pdf")) {
      this.downloadPdfFromUrl(request.url);
      return false;
    } else {
      return true;
    }
  };

  downloadPdfFromUrl = (pdfUrl) => {
    const configOptions = {
      /*
       * "If the [RNFetchBlob] response data is large, that would be a bad idea
       * to convert it into BASE64 string. A better solution is streaming the
       * response directly into a file, simply add a fileCache option to config,
       * and set it to true. This will make incoming response data stored in a
       * temporory path WITHOUT any file extension."
       * 
       * https://github.com/joltup/rn-fetch-blob#download-to-storage-directly
       */
      fileCache: true,
      appendExt: '.pdf', // Append file extension so iOS knows how to open file
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + '/foo',
        description: 'PDF Description Goes Here',
      },
    };
    RNFetchBlob
      .config(configOptions)
      .fetch('GET', pdfUrl)
      .then((result) => {
        RNFetchBlob.ios.openDocument(result.data)
          .catch((error) => {
            alert(`ERROR: ${JSON.stringify(error)}`);
          });
      });
  };


  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              cacheEnabled={false}
              incognito={true}
              source={{ uri: urlWithLinkToPDF }}
              onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          />
        </SafeAreaView>
    );
  }
}

export default App;
