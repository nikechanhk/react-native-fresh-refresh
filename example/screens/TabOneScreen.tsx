import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  FlatListProps,
  Dimensions,
} from 'react-native';

import { Text, View } from '../components/Themed';
import AnimatedLottieView from 'lottie-react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
// @ts-ignore
import RefreshableWrapper from 'react-native-fresh-refresh';
import EmptyComponent from '../components/EmptyComponent';
import ListItem from '../components/ListItem';

type Item = string;

const AnimatedFlatlist =
  Animated.createAnimatedComponent<FlatListProps<Item>>(FlatList);

const { width } = Dimensions.get('screen');

const data: Item[] = ['1', '2', '3', '4', '5', '6'];

export default function TabOneScreen() {
  const contentOffset = useSharedValue(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [listData, setListData] = React.useState<string[]>([]);

  const refreshSimulationHandler = () => {
    setListData([]);
    setIsLoading(true);
    setTimeout(async () => {
      setListData(data);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}></View>
      <RefreshableWrapper
        contentOffset={contentOffset}
        Loader={() => (
          <AnimatedLottieView
            style={styles.lottie}
            autoPlay
            source={require('react-native-fresh-refresh/refresh.json')}
          />
        )}
        isLoading={isLoading}
        onRefresh={() => {
          refreshSimulationHandler();
        }}
        EmptyComponent={EmptyComponent}
      >
        <AnimatedFlatlist
          data={listData}
          bounces={false}
          keyExtractor={(item: string) => item}
          renderItem={({ item }) => {
            return <ListItem item={item} />;
          }}
          style={styles.scrollList}
          contentContainerStyle={styles.contenContainer}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          ListEmptyComponent={() => <EmptyComponent />}
        />
      </RefreshableWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { width, height: 100, backgroundColor: 'grey' },
  contenContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
  lottie: {
    width: 50,
    height: 50,
  },
  scrollList: { width, paddingTop: 20 },
});
