import { Text, View, StyleSheet } from 'react-native';
import CameraDescription from '../../components/cameraDescription';

export default function CameraSearch() {
  return (
    <View style={styles.camera}>
      <CameraDescription />
    </View>
  );
}

const styles = StyleSheet.create(
  {
    camera: {
      flex: 1,
    }
  }
)