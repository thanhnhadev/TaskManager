import React, { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { connect } from 'react-redux';

function TaskChart(props) {
  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={90}
      endAngle={-360}
      colors={{ scheme: 'dark2' }}
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
          itemsSpacing: 20,
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

  function filterTaskDashboard() {
    const date = new Date();
    const lateTaskList = props.taskFromRdc.lsTask.filter(
      (task) =>
        new Date(task.TimeEnd).getTime() < date.getTime() &&
        props.projectFromRdc.lsProject.some(
          (project) => task.ProjectId === project.Id && project.IsClosed === 0
        )
    );
    const pendingTaskList = props.taskFromRdc.lsTask.filter(
      (task) =>
        task.Status === 0 &&
        props.projectFromRdc.lsProject.some(
          (project) => task.ProjectId === project.Id && project.IsClosed === 0
        )
    );
    const startTaskList = props.taskFromRdc.lsTask.filter(
      (task) =>
        task.Status === 1 &&
        props.projectFromRdc.lsProject.some(
          (project) => task.ProjectId === project.Id && project.IsClosed === 0
        )
    );
    const ThreeDayLeftTaskList = props.taskFromRdc.lsTask.filter(
      (task) =>
        (new Date(task.TimeEnd).getTime() -
          new Date(task.TimeStart).getTime()) /
          (24 * 3600 * 1000) <=
          3 &&
        task.Status === 1 &&
        props.projectFromRdc.lsProject.some(
          (project) => task.ProjectId === project.Id && project.IsClosed === 0
        )
    );
    console.log(lateTaskList);
    props.SetLateTaskFunc(lateTaskList);
    props.SetPendingTaskFunc(pendingTaskList);
    props.SetStartTaskFunc(startTaskList);
    props.SetThreeDayLeftTaskFunc(ThreeDayLeftTaskList);
  }

  useEffect(() => {
    filterTaskDashboard();
  }, []);
  return (
    <div className="h-100 w-100 d-flex py-5">
      <div className="w-100 h-100 p-5">
        <MyResponsivePie
          className="w-25 h-25"
          data={[
            {
              id: 'Late Task',
              label: 'Late Task',
              value:
                props.dashBoardFromRdc.lateTask &&
                props.dashBoardFromRdc.lateTask.length,
              color: 'hsl(62, 70%, 50%)',
            },
            {
              id: 'Pending Task',
              label: 'Pending Task',
              value:
                props.dashBoardFromRdc.pendingTask &&
                props.dashBoardFromRdc.pendingTask.length,
              color: 'hsl(319, 70%, 50%)',
            },
            {
              id: 'Start Task',
              label: 'Start Task',
              value:
                props.dashBoardFromRdc.startTask &&
                props.dashBoardFromRdc.startTask.length,
              color: 'hsl(232, 70%, 50%)',
            },
            {
              id: 'Three Days Left Task',
              label: 'Three Days Left Task',
              value:
                props.dashBoardFromRdc.lastThreeDayTask &&
                props.dashBoardFromRdc.lastThreeDayTask.length,
              color: 'hsl(133, 70%, 50%)',
            },
          ]}
        />
      </div>

      {console.log(props.dashBoardFromRdc.startTask)}
      <div className="w-100 text-white overflow-auto">
        <table className="table text-white mb-3">
          <thead>
            <tr className="mb-1 " style={{ background: '#20c997' }}>
              <td colSpan="3" className="text-center">
                Late Tasks
              </td>
            </tr>
            <tr>
              <th>Task id</th>
              <th>Project id</th>
              <th>User name</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.lateTask &&
              props.dashBoardFromRdc.lateTask.map((n) => {
                return (
                  <tr key={n.Id}>
                    <td>{n.Id}</td>
                    <td>{n.ProjectId}</td>
                    <td>{n.UserName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* table on-progress */}
        <table className="table text-white mb-3 ">
          <thead>
            <tr style={{ background: '#6f42c1' }}>
              <td colSpan="3" className="text-center ">
                On-progress Tasks
              </td>
            </tr>
            <tr>
              <th>Task id</th>
              <th>Project id</th>
              <th>User name</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.startTask &&
              props.dashBoardFromRdc.startTask.map((n) => {
                return (
                  <tr key={n.Id}>
                    <td>{n.Id}</td>
                    <td>{n.ProjectId}</td>
                    <td>{n.UserName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* table pending */}
        <table className="table text-white mb-3">
          <thead>
            <tr style={{ background: '#fd7e14' }}>
              <td colSpan="3" className="text-center ">
                Pending Tasks
              </td>
            </tr>
            <tr>
              <th>Task id</th>
              <th>Project id</th>
              <th>User name</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.pendingTask &&
              props.dashBoardFromRdc.pendingTask.map((n) => {
                return (
                  <tr key={n.Id}>
                    <td>{n.Id}</td>
                    <td>{n.ProjectId}</td>
                    <td>{n.UserName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Table 3 days left */}
        <table className="table text-white mb-3 ">
          <thead>
            <tr style={{ background: '#e83e8c' }}>
              <td colSpan="3" className="text-center ">
                Pending Tasks
              </td>
            </tr>
            <tr>
              <th>Task id</th>
              <th>Project id</th>
              <th>User name</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.lastThreeDayTask &&
              props.dashBoardFromRdc.lastThreeDayTask.map((n) => {
                return (
                  <tr>
                    <td key={n.Id}>{n.Id}</td>
                    <td>{n.ProjectId}</td>
                    <td>{n.UserName}</td>
                  </tr>
                );
              })}
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
    SetLateTaskFunc: (data) => {
      dispatch({ type: 'SetLateTask', payload: data });
    },
    SetPendingTaskFunc: (data) => {
      dispatch({ type: 'SetPendingTask', payload: data });
    },
    SetStartTaskFunc: (data) => {
      dispatch({ type: 'SetStartTask', payload: data });
    },
    SetThreeDayLeftTaskFunc: (data) => {
      dispatch({ type: 'SetThreeDayLeftTask', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskChart);
