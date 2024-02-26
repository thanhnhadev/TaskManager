import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

function ProductChart(props) {
  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-300}
      endAngle={60}
      colors={{ scheme: 'set2' }}
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
      arcLinkLabelsDiagonalLength={1}
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
          itemsSpacing: 45,
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

  function filterProductDashboard() {
    const onProgressProject = props.projectFromRdc.lsProject.filter(
      (project) =>
        (new Date(project.TimeEnd).getTime() -
          new Date(project.TimeStart).getTime()) /
          (24 * 3600 * 1000) >
          0 && project.IsClosed === 0
    );
    const SevenDaysLeftReleaseProjectList =
      props.projectFromRdc.lsProject.filter(
        (project) =>
          (new Date(project.TimeEnd).getTime() - new Date().getTime()) /
            (24 * 3600 * 1000) <=
            7 &&
          (new Date(project.TimeEnd).getTime() - new Date().getTime()) /
            (24 * 3600 * 1000) >
            0 &&
          project.IsClosed === 0
      );
    props.SetOnProgressProjectFunc(onProgressProject);
    props.SetReleaseProjectFunc(SevenDaysLeftReleaseProjectList);
  }

  useEffect(() => {
    filterProductDashboard();
  }, []);

  return (
    <div className="h-100 w-100 d-flex py-5">
      <div className="w-100 h-100 p-5">
        <MyResponsivePie
          className="w-25 h-25"
          data={[
            {
              id: 'Onprogress Projects',
              label: 'Onprogress Projects',
              value: props.dashBoardFromRdc.onProgressProject.length,
              color: 'hsl(62, 70%, 50%)',
            },
            {
              id: 'Release on next 7 days',
              label: 'Release on next 7 days',
              value:
                props.dashBoardFromRdc.releaseOnSevenDaysProject &&
                props.dashBoardFromRdc.releaseOnSevenDaysProject.length,
              color: 'hsl(319, 70%, 50%)',
            },
          ]}
        />
      </div>

      {console.log(props.dashBoardFromRdc.onProgressProject)}
      <div className="w-100 text-white overflow-auto">
        <table className="table text-white mb-5">
          <thead>
            <tr className="mb-1" style={{ background: '#20c997' }}>
              <td colSpan="3" className="text-center">
                On-progress Projects
              </td>
            </tr>
            <tr>
              <th>Id</th>
              <th>Project Name</th>
              <th>Time End</th>
            </tr>
          </thead>
          <tbody>
            {props.dashBoardFromRdc.onProgressProject &&
              props.dashBoardFromRdc.onProgressProject.map((n) => {
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

        {/* projects release on nẽt 7 days */}
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
    SetOnProgressProjectFunc: (data) => {
      dispatch({ type: 'SetOnProgressProject', payload: data });
    },
    SetReleaseProjectFunc: (data) => {
      dispatch({ type: 'SetReleaseProjects', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductChart);
