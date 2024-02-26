import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

function MemberDashboard(props) {
  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-180}
      colors={{ scheme: 'set2' }}
      borderWidth={3}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
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
          translateX: -10,
          translateY: 70,
          itemsSpacing: 150,
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
  function filterTaskExpire7days() {
    const completedTaskOnNextSevenDay = props.taskFromRdc.lsTask.filter(
      (task) =>
        (new Date(task.TimeEnd).getTime() - new Date().getTime()) /
          (24 * 3600 * 1000) <=
          7 &&
        (new Date(task.TimeEnd).getTime() - new Date().getTime()) /
          (24 * 3600 * 1000) >
          0 &&
        task.Status !== 2
    );
    console.log(
      props.dashBoardFromRdc.releaseOnSevenDaysProject &&
        props.dashBoardFromRdc.releaseOnSevenDaysProject
    );
    props.SetCompletedTaskOnNextSevenDayFunc(completedTaskOnNextSevenDay);
  }

  useEffect(() => {
    filterTaskExpire7days();
  }, []);
  return (
    <div className="d-flex h-100">
      <div className="text-white w-50 h-50 my-auto">
        {/* <MyResponsivePie
          data={[
            {
              id: 'Tasks need be completed on next 7 days',
              label: 'Tasks need be completed on next 7 days',
              value: props.dashBoardFromRdc.completedTaskOnNextSevenDay,
              color: 'hsl(62, 70%, 50%)',
            },
            {
              id: 'Projects release on next 7 days',
              label: 'Projects release on next 7 days',
              value: props.dashBoardFromRdc.releaseOnSevenDaysProject.length,
              color: 'hsl(319, 70%, 50%)',
            },
          ]}
        /> */}
        <table className="table  text-white ">
          <thead>
            <tr>
              <th colSpan="5" className="text-center">
                Completed Tasks on next 7 days
              </th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Time End</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.completedTaskOnNextSevenDay &&
              props.dashBoardFromRdc.completedTaskOnNextSevenDay.map((n) => {
                return (
                  <tr key={n.Id}>
                    <td>{n.Id}</td>
                    <td>{n.ProjectId}</td>
                    <td>{n.ProjectName}</td>
                    <td>{n.TimeEnd}</td>
                    <td>{n.UserName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br></br>

        {/* projects release on next 7 days */}
        <table className="table text-white mb-3">
          <thead>
            <tr className="mb-1 " style={{ background: 'rgb(252, 141, 98)' }}>
              <td colSpan="3" className="text-center">
                Projects release on next 7 days
              </td>
            </tr>
            <tr>
              <th>Id</th>
              <th>Project Name</th>
              <th>Time End</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.releaseOnSevenDaysProject &&
              props.dashBoardFromRdc.releaseOnSevenDaysProject.map((n) => {
                return (
                  <tr key={n.Id}>
                    <td>{n.Id}</td>
                    <td>{n.Name}</td>
                    <td>{n.TimeEnd}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* right side */}
      <div className="my-auto ml-5">
        <div>
          <h2 className="text-white">Your project lists</h2>
          {/* Table for project */}
          <table className="table text-white w-100 table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                {/* <th>PAYMENT</th> */}
                {/* <th>TIME START</th> */}
                {/* <th>TIME END</th> */}
                <th>NOTE</th>
                <th>PRIORITY</th>
              </tr>
            </thead>
            <tbody>
              {props.loginStatus.currentUser &&
                props.projectFromRdc.lsProject &&
                props.projectFromRdc.lsProject
                  .filter((lsProject) => {
                    return props.taskFromRdc.lsTask.some(
                      (task) =>
                        task.ProjectName === lsProject.Name &&
                        props.loginStatus.currentUser[0].Email === task.UserMail
                    );
                  })
                  .map((x) => {
                    return (
                      <tr key={x.Id}>
                        <td>{x.Id}</td>
                        <td>{x.Name}</td>
                        {/* <td>{x.Payment}</td> */}
                        {/* <td>{x.TimeStart}</td> */}
                        {/* <td>{x.TimeEnd}</td> */}
                        <td>{x.Note}</td>
                        <td>{x.Priority}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-white">Your task lists</h2>
          <table className="table text-white w-100 table-hover ">
            <thead>
              <tr>
                <th className="align-middle">ID</th>
                {/* <th className="align-middle">USER MAIL</th> */}
                {/* <th className="align-middle">PROJECT ID</th> */}
                <th className="align-middle">PROJECT NAME</th>

                {/* <th className="align-middle">TIME START</th> */}
                {/* <th className="align-middle">TIME END</th> */}
                <th className="align-middle">STATUS</th>
                <th className="align-middle">NOTE</th>
                {/* <th className="align-middle">USERNAME</th> */}
              </tr>
            </thead>
            <tbody>
              {props.taskFromRdc.lsTask &&
                props.loginStatus.currentUser &&
                props.taskFromRdc.lsTask
                  .filter(
                    (n) => n.UserMail === props.loginStatus.currentUser[0].Email
                  )
                  .map((task) => {
                    return (
                      <tr key={task.Id}>
                        <td className="align-middle">{task.Id}</td>
                        {/* <td className="align-middle">{task.UserMail}</td> */}
                        {/* <td className="align-middle">{task.ProjectId}</td> */}
                        <td className="align-middle">{task.ProjectName}</td>

                        {/* <td className="align-middle">{task.TimeStart}</td> */}
                        {/* <td className="align-middle">{task.TimeEnd}</td> */}
                        <td className="align-middle">
                          {task.Status === 0
                            ? 'Pending'
                            : task.Status === 1
                            ? 'Start'
                            : 'Completed'}
                        </td>
                        <td className="align-middle">{task.Note}</td>
                        {/* <td className="align-middle">{task.UserName}</td> */}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
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
    SetCompletedTaskOnNextSevenDayFunc: (data) => {
      dispatch({ type: 'SetCompletedTaskOnNextSevenDay', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberDashboard);
