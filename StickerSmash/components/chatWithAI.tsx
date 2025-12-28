import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import ChatWithAIScreen from './chatWithAIScreen';
import IconButton from './iconButton';

export default function ChatWithAI() {
  const [flip, setFlip] = useState(true);
  const [tab, setTab] = useState("chat");
  const chatTabValue = ["chat","popular","review"];

  return (
    <View style={styles.container}> {/*一番外枠*/}
      <View style={styles.rowContain}> {/* 横並び */}
        <IconButton
          iconName= {flip ? 'chevron-down-circle-outline' :'chevron-up-circle-outline'}
          onPress={() => setFlip(!flip)}
          color = '#222222ff'
          backgroundColor = '#a8a8a8ff'
        /> {/*折り畳みボタン*/}
      </View>
      {
      flip && (
        <>
          <View style={styles.rowContain}> {/*絵画の説明*/}
            <Text> {/*絵画の名前*/}
              作品名
            </Text>
            <Text> {/*絵画の作者*/}
              作者
            </Text>
          </View>
          {/* <ChatWithAIScreen /> */}
          <View> {/*入力欄*/}
            <View> {/*テキスト入力欄*/}

            </View>
            <View> {/*送信ボタン*/}

            </View>
          </View>
          <View style={styles.rowContain}> {/*タブ*/}
            <IconButton
              iconName={tab=='chat' ? 'chatbubbles':'chatbubbles-outline'}
              onPress={() => setTab(chatTabValue[0])}
            /> {/*チャット*/}
            <IconButton
              iconName={tab=='popular' ? 'search-circle':'search-circle-outline'}
              onPress={() => setTab(chatTabValue[1])}
            /> {/*質問一覧*/}
            <IconButton
              iconName={tab=='review' ? 'happy':'happy-outline'}
              onPress={() => setTab(chatTabValue[2])}
            /> {/*アンケートと結果*/}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rowContain: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  }
});