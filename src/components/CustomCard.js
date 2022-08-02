import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {PieChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import appColors from '../config-app/appColors';
import appDimensions from '../config-app/appDimensions';
import Icon from 'react-native-vector-icons/Feather';
import useTimeBlockedCallback from '../helpers/DoubleTapHelper';
import {fetchChartDetails} from '../features/home/HomeActionCreator';

const screenWidth = Dimensions.get('window').width;

const CustomCard: () => React$Node = (props) => {
  const {data, customerId} = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const handlePressGoButton = useTimeBlockedCallback(() => {
    //   console.log();
    const start_date = moment(startDate).format('YYYY-DD-MM');
    const end_date = moment(endDate).format('YYYY-DD-MM');
    store.dispatch(fetchChartDetails(customerId, start_date, end_date));
  });

  const onChangeDate = (event, selectedDate) => {
    setIsShowDatePicker(false);
    setStartDate(selectedDate);
  };

  const combineStyles = StyleSheet.flatten([styles.container, props.style]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 10, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={combineStyles}>
      <View style={styles.dateWrapper}>
        <Pressable
          onPress={() => setIsShowDatePicker(true)}
          style={{flex: 0.4}}>
          <Text style={styles.startDateLabelText}>Start Date</Text>
          <View style={styles.startDateContainer}>
            <Text style={styles.startDateValueText}>
              {moment(startDate).format('DD-MMM-YYYY')}
            </Text>
            <Pressable style={{flex: 0.2}}>
              <Icon name="calendar" />
            </Pressable>
          </View>
        </Pressable>
        <View style={{flex: 0.4}}>
          <Text style={styles.endDateLabelText}>End Date</Text>
          <View style={styles.endDateContainer}>
            <Text style={styles.endDateValueText}>
              {moment(endDate).format('DD-MMM-YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePressGoButton}
            style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
      {data.length > 0 && (
        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <PieChart
              data={data}
              width={screenWidth - 100}
              height={220}
              chartConfig={chartConfig}
              accessor={'data'}
              backgroundColor={'transparent'}
              // paddingTop={'44'}
              center={[85, 0]}
              absolute
              hasLegend={false}
              onDataPointClick={() => console.log('Test')}
            />
            {data.map((item, index) => (
              <View key={`HHD82364236${index}`} style={styles.chartTextWrapper}>
                <View
                  style={[
                    styles.chartDot,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
                <Text style={styles.chartText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {isShowDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: appDimensions.DIM_16,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: appDimensions.DIM_12,
  },
  startDateLabelText: {
    fontSize: appDimensions.DIM_12,
    fontWeight: 'bold',
    color: appColors.greyDark,
  },
  startDateContainer: {
    flexDirection: 'row',
    borderColor: appColors.bismark,
    borderWidth: appDimensions.DIM_1,
    alignItems: 'center',
    marginRight: appDimensions.DIM_10,
    paddingLeft: appDimensions.DIM_6,
    marginTop: appDimensions.DIM_4,
    borderRadius: appDimensions.DIM_4,
  },
  startDateValueText: {
    flex: 0.8,
    fontSize: appDimensions.DIM_12,
    fontWeight: 'bold',
    color: appColors.greyDark,
    paddingVertical: appDimensions.DIM_6,
  },
  endDateLabelText: {
    fontSize: appDimensions.DIM_12,
    fontWeight: 'bold',
    color: appColors.greyDark,
  },
  endDateContainer: {
    borderColor: appColors.bismark,
    borderWidth: appDimensions.DIM_1,
    paddingLeft: appDimensions.DIM_6,
    marginRight: appDimensions.DIM_10,
    marginTop: appDimensions.DIM_4,
    borderRadius: appDimensions.DIM_4,
  },
  endDateValueText: {
    fontSize: appDimensions.DIM_12,
    fontWeight: 'bold',
    color: appColors.greyDark,
    paddingVertical: appDimensions.DIM_6,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    backgroundColor: appColors.primary,
    borderRadius: appDimensions.DIM_4,
  },
  buttonText: {
    fontSize: appDimensions.DIM_12,
    paddingHorizontal: appDimensions.DIM_16,
    paddingVertical: appDimensions.DIM_12,
    fontWeight: 'bold',
    color: appColors.white,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  chartWrapper: {
    width: screenWidth - 70,
    elevation: appDimensions.DIM_1,
    borderWidth: appDimensions.DIM_1,
    borderColor: appColors.greyLight,
    backgroundColor: appColors.white,
    paddingBottom: '10%',
    marginBottom: appDimensions.DIM_12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTextWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: appDimensions.DIM_2,
  },
  chartDot: {
    height: appDimensions.DIM_16,
    width: appDimensions.DIM_16,
    borderRadius: appDimensions.DIM_8,
  },
  chartText: {
    fontSize: appDimensions.DIM_10,
    fontWeight: 'bold',
    color: appColors.bismark,
    paddingLeft: appDimensions.DIM_6,
  },
});

export default CustomCard;
