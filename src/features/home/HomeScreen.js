import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {List} from 'react-native-paper';
import appColors from '../../config-app/appColors';
import appDimensions from '../../config-app/appDimensions';
import {fetchCustomersList} from './HomeActionCreator';
import appConstants from '../../config-app/appConstants';
import CustomCard from '../../components/CustomCard';
import LoadingView from '../../components/LoadingView';

const HomeScreen: () => React$Node = (props) => {
  const {currentPageNo, customersList, isFetchingData} = props;

  const [customerRenderList, setCustomerRenderList] = useState([]);
  const [totalRecord, setTotalRecord] = useState('');

  const handlePressNext = () => {
    const currentValue = parseInt(totalRecord);
    const nextValue = parseInt(totalRecord) + 8;
    const tempArray = [...customersList];
    if (customersList.length < nextValue) {
      const arr = tempArray.slice(currentValue, customersList.length);
      setCustomerRenderList(arr);
      setTotalRecord(customersList.length.toString());
    } else {
      const arr = tempArray.slice(currentValue, nextValue);
      setCustomerRenderList(arr);
      setTotalRecord(nextValue.toString());
    }
  };

  const handlePressPrev = () => {
    const currentValue = parseInt(totalRecord);
    const prevValue = parseInt(totalRecord) - 8;
    const tempArray = [...customersList];
    if (customersList.length == currentValue) {
      const len = customersList.length;
      const extraValue = len % 8;
      const arr = tempArray.slice(prevValue - extraValue, customersList.length);
      setCustomerRenderList(arr);
      setTotalRecord((currentValue - extraValue).toString());
    } else {
      const arr = tempArray.slice(prevValue, currentValue);
      setCustomerRenderList(arr);
      setTotalRecord(prevValue.toString());
    }
  };

  useEffect(() => {
    store.dispatch(fetchCustomersList());
  }, []);

  useEffect(() => {
    const tempArray = [...customersList];
    if (tempArray.length > 8) {
      const arr = tempArray.slice(0, 8);
      setCustomerRenderList(arr);
      setTotalRecord('8');
    } else {
      const arr = tempArray.slice(0, tempArray.length);
      setCustomerRenderList(arr);
      setTotalRecord(tempArray.length.toString());
    }
  }, []);

  const _renderItem = ({item}) => (
    <List.Accordion
      title={`User   ${item?.first_name} ${item?.last_name}`}
      style={{
        backgroundColor: appColors.white,
        marginHorizontal: appDimensions.DIM_10,
        marginTop: appDimensions.DIM_10,
        elevation: appDimensions.DIM_1,
      }}>
      <CustomCard data={item?.chartList} customerId={item.customer_id} />
    </List.Accordion>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={customerRenderList}
        renderItem={_renderItem}
        keyExtractor={(item) => item.customer_id}
        initialNumToRender={appConstants.TOTAL_ITEM}
        style={styles.flatlist}
        ListEmptyComponent={() => (
          <Text style={styles.noDataText}>No Data</Text>
        )}
      />
      {customerRenderList.length > 0 && (
        <View style={styles.wrapper}>
          <View style={styles.buttonContainer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={handlePressPrev}
                disabled={parseInt(totalRecord) <= 8 ? true : false}
                style={[
                  styles.buttonWrapper,
                  {
                    backgroundColor:
                      parseInt(totalRecord) <= 8
                        ? appColors.greyMedium
                        : appColors.primary,
                  },
                ]}>
                <EvilIcons
                  name="arrow-left"
                  size={appDimensions.DIM_20}
                  color={appColors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressNext}
                disabled={
                  parseInt(totalRecord) == customersList.length ? true : false
                }
                style={[
                  styles.buttonWrapper,
                  {
                    backgroundColor:
                      parseInt(totalRecord) == customersList.length
                        ? appColors.greyMedium
                        : appColors.primary,
                  },
                ]}>
                <EvilIcons
                  name="arrow-right"
                  size={appDimensions.DIM_20}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                {`Showing ${
                  parseInt(totalRecord) == customersList.length
                    ? parseInt(totalRecord) - (parseInt(totalRecord) % 8)
                    : parseInt(totalRecord) - 7
                } to ${totalRecord} of ${customersList.length}`}
              </Text>
            </View>
          </View>
        </View>
      )}
      <LoadingView visible={isFetchingData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  flatlist: {
    flex: 0.8,
    marginBottom: '1%',
  },
  wrapper: {
    flex: 0.2,
    backgroundColor: appColors.white,
    elevation: appDimensions.DIM_2,
    borderTopColor: appColors.greyMedium,
    borderTopWidth: appDimensions.DIM_1,
  },
  text: {
    fontSize: appDimensions.DIM_10,
    fontWeight: 'bold',
    textAlign: 'right',
    color: appColors.bismark,
  },
  buttonWrapper: {
    paddingHorizontal: appDimensions.DIM_12,
    paddingVertical: appDimensions.DIM_6,
    marginLeft: appDimensions.DIM_6,
    borderRadius: appDimensions.DIM_4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: appDimensions.DIM_8,
  },
  noDataText: {
    alignSelf: 'center',
    fontSize: appDimensions.DIM_14,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({home}) => {
  const {currentPageNo, customersList, isFetchingData, chartList} = home;
  return {
    currentPageNo,
    customersList,
    isFetchingData,
    chartList,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
