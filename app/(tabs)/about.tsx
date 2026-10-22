import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.h1}>CO・METについて</Text>
        <View style={styles.aboutCards}>
          <View style={styles.aboutCard}>
            <Text style={styles.h2}>美術館をもっと楽しく</Text>
            <Text style={styles.description}>
              このCO・METは、美術館をもっと楽しくするためのアプリです。
              美術鑑賞特有の「よくわからない」「むずかしそう」という悩みを解決します。
            </Text>
          </View>
          
          <View style={styles.aboutCard}>
            <Text style={styles.h2}>カメラで絵画検索</Text>
            <Text style={styles.description}>
              カメラ映像から絵画を検索することができます。また、ヒットした絵画についてAIに質問することもできます。
              AIとのインタラクティブなやり取りは、きっとあなたに新たな気付きを与えるでしょう。
            </Text>
          </View>
          
          <View style={styles.aboutCard}>
            <Text style={styles.h2}>テキスト検索</Text>
            <Text style={styles.description}>
              テキストサーチページでは、テキストで絵画を検索することができます。
              「こんな絵ないかな」と思い立ったら、気軽に探してみましょう。
              気になった絵画については、詳細ページに移ってAIとチャットができます。
            </Text>
          </View>
          
          <View style={styles.aboutCard}>
            <Text style={styles.h2}>体験してみませんか？</Text>
            <Text style={styles.description}>
              美術鑑賞がもっと身近で楽しいものになるCO・METで、新しいアート体験を始めましょう。
            </Text>
            <Link href="/(tabs)/cameraSearch" style={styles.button}>
              アプリを始める
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fdf3dcff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fdf3dcff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    gap: 10,
  },
  h1: {
    fontSize: 30,
    color: '#000000',
  },
  aboutCards: {
    flexDirection: 'row', //横並び
    flexWrap: 'wrap', //折り返し許可
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  aboutCard: {
    width: 350,
    height: 200,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f7d891ff",
    alignItems: 'center' ,
    justifyContent: 'center',
  },
  h2: {
    fontSize: 20,
    color: '#000000',
  },
  description: {
    fontSize: 8,
  },
  button: {
    fontSize: 8,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});