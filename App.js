import React from 'react';
import {
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';

const urlWithLinkToPDF = "https://topherpedersen.blog/2021/09/29/how-to-download-a-pdf-from-a-webview-in-react-native/";
const pdfURL = "https://archive.org/download/MythicalManMonth/Brooks%201974%20The%20Mythical%20Man-Month-%20Essays%20on%20Software%20Engineering%2C%20Anniversary%20Edition%20%282nd%20Edition%29.pdf";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              cacheEnabled={false}
              incognito={true}
              source={{ uri: urlWithLinkToPDF }}
          />
        </SafeAreaView>
    );
  }
}

export default App;
