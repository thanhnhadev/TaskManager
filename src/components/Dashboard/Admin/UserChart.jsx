import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

function UserChart(props) {
  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={80}
      endAngle={-280}
      colors={{ scheme: 'dark2' }}
      borderWidth={3}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      // enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextOffset={4}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsOffset={1}
      arcLinkLabelsDiagonalLength={17}
      arcLinkLabelsStraightLength={14}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
      arcLabelsRadiusOffset={0.6}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['brighter', '3']],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'Three Days Left Task',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'Late Task',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'Pending Task',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'Start Task',
          },
          id: 'lines',
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: -80,
          translateY: 70,
          itemsSpacing: 60,
          itemWidth: 87,
          itemHeight: 23,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 21,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );

  function filterUserDashboard() {
    const userNotOnTask = props.userFromRdc.lsUser.filter((user) => {
      return props.taskFromRdc.lsTask.every(
        (task) => !task.UserMail.includes(user.Email)
      );
    });
    const completedTaskOnNextSevenDayUser = props.userFromRdc.lsUser.filter(
      (user) => {
        return props.taskFromRdc.lsTask.some(
          (task) =>
            (new Date(task.TimeEnd).getTime() - new Date().getTime()) /
              (24 * 3600 * 1000) <=
              7 && user.Email === task.UserMail
        );
      }
    );

    props.SetEmptyTaskUserFunc(userNotOnTask);
    props.SetCompletedTaskOnNextSevenDayUser(completedTaskOnNextSevenDayUser);
  }

  useEffect(() => {
    filterUserDashboard();
  }, []);

  return (
    <div className="h-100 w-100 d-flex py-5">
      <div className="w-100 h-100 p-5">
        <MyResponsivePie
          className="w-25 h-25"
          data={[
            {
              id: 'Empty Task User',
              label: 'Empty Task User',
              value: props.dashBoardFromRdc.emptyTaskUser.length,
              color: 'hsl(62, 70%, 50%)',
            },
            {
              id: "User's Lists has tasks need be completed on next 7 days",
              label: 'Lists of User - Tasks need be completed on next 7 days',
              value:
                props.dashBoardFromRdc.completedTaskOnNextSevenDayUser.length,
              color: 'hsl(319, 70%, 50%)',
            },
            // {
            //   id: 'Start Task',
            //   label: 'Start Task',
            //   value: props.dashBoardFromRdc.startTask,
            //   color: 'hsl(232, 70%, 50%)',
            // },
            // {
            //   id: 'Three Days Left Task',
            //   label: 'Three Days Left Task',
            //   value: props.dashBoardFromRdc.lastThreeDayTask,
            //   color: 'hsl(133, 70%, 50%)',
            // },
          ]}
        />
      </div>

      {console.log(props.dashBoardFromRdc.completedTaskOnNextSevenDayUser)}
      <div className="w-100 text-white overflow-auto">
        <table className="table text-white mb-5">
          <thead>
            <tr className="mb-1" style={{ background: '#20c997' }}>
              <td colspan="3" className="text-center">
                Empty Task User's List
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.emptyTaskUser &&
              props.dashBoardFromRdc.emptyTaskUser.map((n) => {
                return (
                  <tr>
                    <td>{n.Email}</td>
                    <td>{n.Name}</td>
                    <td>{n.Role === 1 ? 'Admin' : 'Member'}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* projects release on nẽt 7 days */}
        <table className="table text-white mb-3">
          <thead>
            <tr className="mb-1 " style={{ background: '#fd7e14' }}>
              <td colspan="3" className="text-center">
                User Lists have tasks need be completed on next 7 days
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.completedTaskOnNextSevenDayUser &&
              props.dashBoardFromRdc.completedTaskOnNextSevenDayUser.map(
                (n) => {
                  return (
                    <tr>
                      <td>{n.Email}</td>
                      <td>{n.Name}</td>
                      <td>{n.Role}</td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userFromRdc: state.userRdc,
    loginStatus: state.loginRdc,
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
    dashBoardFromRdc: state.dashBoardRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetCompletedTaskOnNextSevenDayUser: (data) => {
      dispatch({ type: 'SetCompletedTaskOnNextSevenDayUser', payload: data });
    },
    SetEmptyTaskUserFunc: (data) => {
      dispatch({ type: 'SetEmptyTaskUser', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChart);
