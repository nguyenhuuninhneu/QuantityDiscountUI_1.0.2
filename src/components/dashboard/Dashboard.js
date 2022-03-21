import '../../assets/css/dashboard.css'
import { Card, Subheading, Heading, DatePicker, Button, Toast, PageActions, TextField, Icon, List } from '@shopify/polaris';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarMajor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import moreAppConfig from '../../config/moreAppConfig';
import { setDashboard } from '../../state/modules/dashboard/actions';
import { fetchDashboard } from '../../state/modules/dashboard/operations';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



function Dashboard() {

  const dispatch = useDispatch();
  const dashboardState = useSelector((state) => state.dashboard.Dashboard);
  var today = new Date();

  useEffect(() => {
    var strDateToday = today.getFullYear() + '-' + (today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
    dispatch(fetchDashboard(strDateToday, strDateToday));
  }, [dispatch]);
  const [{ month, year }, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date()
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    [],
  );

  const handleChangeSetDate = (e) => {
    var strStart = e.start.toLocaleDateString("en-US", optionsDate);
    var strEnd = e.end.toLocaleDateString("en-US", optionsDate);
    var startdate = e.start.getFullYear() + '-' + (e.start.getMonth() < 9 ? '0' + (e.start.getMonth() + 1) : e.start.getMonth() + 1) + '-' + (e.start.getDate() < 10 ? '0' + e.start.getDate() : e.start.getDate());
    var enddate = e.end.getFullYear() + '-' + (e.end.getMonth() < 9 ? '0' + (e.end.getMonth() + 1) : e.end.getMonth() + 1) + '-' + (e.end.getDate() < 10 ? '0' + e.end.getDate() : e.end.getDate());
    dispatch(setDashboard({
      ...dashboardState,
      DateRange: {
        ...dashboardState.DateRange,
        StartDate: startdate,
        StartDateStr: strStart,
        EndDate: enddate,
        EndDateStr: strEnd
      }
    }))
    setSelectedDates({
      start: e.start,
      end: e.end
    })
  }


  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  var optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
  const handleChangeDateRangeOption = (e) => {
    var now = new Date();
    var getStartDate;
    var getEndDate;
    switch (e.value) {
      case 1:
        //Today
        setSelectedDates({
          start: now,
          end: now
        })
        getStartDate = now;
        getEndDate = now;
        break;
      case 2:
        //Yesterday
        var date2 = new Date();
        date2.setDate(date2.getDate() - 1);
        setSelectedDates({
          start: date2,
          end: date2
        })
        getStartDate = date2;
        getEndDate = date2;
        break;
      case 3:
        //Last 7 days
        setSelectedDates({
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          end: now
        })
        getStartDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        getEndDate = now;
        break;

      case 4:
        //Last 30 days
        var date4 = new Date();
        setSelectedDates({
          start: new Date(date4.setDate(date4.getDate() - 30)),
          end: now
        })
        getStartDate = new Date(date4.setDate(date4.getDate() - 30));
        getEndDate = now;
        break;
      case 5:
        //Last 90 days
        var date5 = new Date();
        setSelectedDates({
          start: new Date(date5.setDate(date5.getDate() - 90)),
          end: now
        })
        getStartDate = new Date(date5.setDate(date5.getDate() - 90));
        getEndDate = now;
        break;
      case 6:
        //Last quarter
        //Previous quarter
        const quarter = Math.floor((now.getMonth() / 3));
        const startFullQuarter = new Date(now.getFullYear(), quarter * 3 - 3, 1);
        const endFullQuarter = new Date(startFullQuarter.getFullYear(), startFullQuarter.getMonth() + 3, 0);
        setSelectedDates({
          start: startFullQuarter,
          end: endFullQuarter
        })
        getStartDate = startFullQuarter;
        getEndDate = endFullQuarter;
        break;
      case 7:
        //Last months
        var date7 = new Date();
        date7.setMonth(date7.getMonth() - 1);
        setSelectedDates({
          start: date7,
          end: now
        })
        getStartDate = date7;
        getEndDate = now;
        break;
      case 8:
        //Last year
        const date8 = new Date();
        date8.setFullYear(date8.getFullYear() - 1);
        setSelectedDates({
          start: date8,
          end: now
        })
        getStartDate = date8;
        getEndDate = now;
        break;
      case 9:
        //Month to date
        var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        setSelectedDates({
          start: firstDay,
          end: now
        })
        getStartDate = firstDay;
        getEndDate = now;
        break;
      case 10:
        //Quarter to date
        var quarter10 = Math.floor((now.getMonth() + 3) / 3);
        const startQuarter = new Date(now.getFullYear(), quarter10 * 3 - 3, 1);
        setSelectedDates({
          start: startQuarter,
          end: now
        })
        getStartDate = startQuarter;
        getEndDate = now;
        break;
      case 11:
        //year to date
        var first = new Date(new Date().getFullYear(), 0, 1);
        setSelectedDates({
          start: first,
          end: now
        })
        getStartDate = first;
        getEndDate = now;
        break;
      default:
        setSelectedDates({
          start: now,
          end: now
        })
        getStartDate = now;
        getEndDate = now;
        break;
    }


    var strStart = getStartDate.getFullYear() + '-' + (getStartDate.getMonth() < 9 ? '0' + (getStartDate.getMonth() + 1) : getStartDate.getMonth() + 1) + '-' + (getStartDate.getDate() < 10 ? '0' + getStartDate.getDate() : getStartDate.getDate());
    var strEnd = getEndDate.getFullYear() + '-' + (getEndDate.getMonth() < 9 ? '0' + (getEndDate.getMonth() + 1) : getEndDate.getMonth() + 1) + '-' + (getEndDate.getDate() < 10 ? '0' + getEndDate.getDate() : getEndDate.getDate());
    console.log(strStart)
    console.log(strEnd)
    dispatch(setDashboard({
      ...dashboardState,
      DateRange: {
        ...dashboardState.DateRange,
        SelectedTypeRange: e,
        StartDate: strStart,
        EndDate: strEnd,
        StartDateStr: getStartDate.toLocaleDateString("en-US", optionsDate),
        EndDateStr: getEndDate.toLocaleDateString("en-US", optionsDate)
      }
    }))
    setDate({ month: getEndDate.getMonth(), year: getEndDate.getFullYear() })
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className='dashboard'>
      <div className='control-input-date-range'>
        <div className='input-display w30pt'>
          <div className='input-calendar' onClick={() => {
            dispatch(setDashboard({
              ...dashboardState,
              IsOpenDateRange: true
            }))
          }}>
            <TextField
              disabled={true}
              value={dashboardState.DateRange.StartDateStr + ' - ' + dashboardState.DateRange.EndDateStr}
              type="text"
            />
            <span className='calendar'><Icon
              source={CalendarMajor}
              color="base" /></span>
          </div>
        </div>
        {
          dashboardState.IsOpenDateRange ? <>
            <div className='date-range'>
              <Card>
                <Card.Section>
                  <Select
                    label="Date Range"
                    defaultValue={moreAppConfig.DateRangeType[0]}
                    options={moreAppConfig.DateRangeType}
                    onChange={(e) => {
                      handleChangeDateRangeOption(e);

                    }}
                    // value={moreAppConfig.DateRangeType.filter(p => p== dashboardState.DateRange.SelectedTypeRange)[0] || moreAppConfig.DateRangeType[0]}
                    // value={parseInt(dashboardState.DateRange.SelectedTypeRange)}
                    isSearchable={false}
                  // selected={dashboardState.DateRange.SelectedTypeRange}
                  />
                  <div className='start-end-date'>
                    <div className='item-date'>
                      <TextField
                        label='Start date'
                        value={dashboardState.DateRange.StartDate}
                        type="date"
                        onChange={(e) => {
                          var getStartDate = new Date(Date.parse(e));
                          var strStart = getStartDate.toLocaleDateString("en-US", optionsDate);
                          dispatch(setDashboard({
                            ...dashboardState,
                            DateRange: {
                              ...dashboardState.DateRange,
                              StartDate: e,
                              StartDateStr: strStart
                            }
                          }))
                          setSelectedDates({
                            start: getStartDate,
                            end: new Date(Date.parse(dashboardState.DateRange.EndDate)),
                          })

                        }}
                      />
                    </div>
                    <div className='item-date'>
                      <TextField
                        label='End date'
                        value={dashboardState.DateRange.EndDate}
                        type="date"
                        onChange={(e) => {
                          var getEndDate = new Date(Date.parse(e));
                          var strEnd = getEndDate.toLocaleDateString("en-US", optionsDate);
                          dispatch(setDashboard({
                            ...dashboardState,
                            DateRange: {
                              ...dashboardState.DateRange,
                              EndDate: e,
                              EndDateStr: strEnd
                            }
                          }))
                          setSelectedDates({
                            start: new Date(Date.parse(dashboardState.DateRange.StartDate)),
                            end: getEndDate,
                          })
                        }}
                      />
                    </div>
                  </div>
                  <div className='cb'>

                  </div>
                  <DatePicker
                    month={month}
                    year={year}
                    onChange={(e) => {
                      handleChangeSetDate(e);
                    }}
                    onMonthChange={handleMonthChange}
                    selected={selectedDates}
                    multiMonth
                    allowRange
                  />
                  <div className='mt-10'>

                  </div>
                  <PageActions
                    primaryAction={{
                      content: 'Apply',
                      onAction: () => {
                        dispatch(setDashboard({
                          ...dashboardState,
                          IsOpenDateRange: false
                        }))
                        var strStart = selectedDates.start.getFullYear() + '-' + (selectedDates.start.getMonth() < 9 ? '0' + (selectedDates.start.getMonth() + 1) : selectedDates.start.getMonth() + 1) + '-' + (selectedDates.start.getDate() < 10 ? '0' + selectedDates.start.getDate() : selectedDates.start.getDate());
                        var strEnd = selectedDates.end.getFullYear() + '-' + (selectedDates.end.getMonth() < 9 ? '0' + (selectedDates.end.getMonth() + 1) : selectedDates.end.getMonth() + 1) + '-' + (selectedDates.end.getDate() < 10 ? '0' + selectedDates.end.getDate() : selectedDates.end.getDate());
                        dispatch(fetchDashboard(strStart, strEnd))
                      }
                    }}
                    secondaryActions={[
                      {
                        content: 'Cancel',
                        onAction: () => {
                          dispatch(setDashboard({
                            ...dashboardState,
                            IsOpenDateRange: false
                          }))
                        }
                      },
                    ]}
                  />
                </Card.Section>
              </Card>

            </div>
          </> : null
        }
      </div>

      {
        dashboardState.IsLoadingPage ?
          <Loading></Loading>
          :
          <>
            <div className='card-campaign'>
              <Card>
                <Card.Section>
                  <Subheading>From total of {dashboardState.DashboardData.TotalCampaign} campaigns</Subheading>
                  <div className='group group-campaign'>
                    <div className='item'>
                      <div className='number'>
                        {numberWithCommas(dashboardState.DashboardData.TotalViewProductPage)}
                      </div>
                      <div className='description'>
                        Total view product page
                      </div>
                    </div>
                    <div className='item'>
                      <div className='number'>
                        {numberWithCommas(dashboardState.DashboardData.TotalViewCartPage)}
                      </div>
                      <div className='description'>
                        Total view cart page
                      </div>
                    </div>
                    <div className='item'>
                      <div className='number'>
                        {numberWithCommas(dashboardState.DashboardData.TotalViewCheckoutPage)}
                      </div>
                      <div className='description'>
                        Total view checkout page
                      </div>
                    </div>
                    <div className='item'>
                      <div className='number'>
                        {numberWithCommas(dashboardState.DashboardData.TotalOrders)}
                      </div>
                      <div className='description'>
                        Total orders
                      </div>
                    </div>
                    <div className='cb'>
                    </div>
                  </div>
                </Card.Section>
              </Card>
            </div>

            <div className='card-sales'>
              <Card>
                <Card.Section>
                  <Subheading>Among total sales:</Subheading>
                  <div className='group group-sales'>
                    <div className='item'>
                      <div className='number'>
                        {dashboardState.DashboardData.OrdersAppliedDiscount}/{dashboardState.DashboardData.TotalOrders}
                      </div>
                      <div className='percent'>
                        ~{dashboardState.DashboardData.OrdersAppliedDiscountPercentage}%
                      </div>
                      <div className='cb'>
                      </div>
                      <div className='description'>
                        Orders applied discount
                      </div>
                    </div>
                    <div className='item'>
                      <div className='number'>
                        {dashboardState.DashboardData.ProductsAppliedDiscount}/{dashboardState.DashboardData.TotalProduct}
                      </div>
                      <div className='percent'>
                        ~{dashboardState.DashboardData.ProductsAppliedDiscountPercentage * 100}%
                      </div>
                      <div className='cb'>
                      </div>
                      <div className='description'>
                        Products applied discount
                      </div>
                    </div>
                    <div className='cb'>

                    </div>
                  </div>
                </Card.Section>
              </Card>
            </div>
            <div className='card-discount'>
              <Card>
                <Card.Section>
                  <Subheading>Among total orders applied discount:</Subheading>
                  <div className='group group-discount'>
                    <div className='item'>
                      <div className='number'>
                        ${numberWithCommas(dashboardState.DashboardData.TotalDiscount)}
                      </div>
                      <div className='description'>
                        Total discount
                      </div>
                    </div>
                    <div className='item'>
                      <div className='number'>
                        ${numberWithCommas(dashboardState.DashboardData.TotalOrderValue)}
                      </div>
                      <div className='description'>
                        Total order value
                      </div>
                    </div>
                    <div className='cb'>

                    </div>
                  </div>
                </Card.Section>
              </Card>
            </div>
            <div className='cb'>
            </div>

            <div className='chart'>
              <Heading>Revenue of total orders vs revenue of applied discount orders</Heading>
              <Line
                data={dashboardState.DataChart}
                width={300}
                height={150}
                options={options}
              ></Line>
            </div>
          </>
      }

    </div>
  )
}

export default Dashboard