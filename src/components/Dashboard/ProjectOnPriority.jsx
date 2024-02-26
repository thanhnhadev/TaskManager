import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

function ProjectOnPriority(props) {
  const myArr = [
    {
      id: 'Onprogress Projects',
      label: 'Onprogress Projects',
      value: props.dashBoardFromRdc.onProgressProject,
      color: 'hsl(62, 70%, 50%)',
    },
    {
      id: 'Release on next 7 days',
      label: 'Release on next 7 days',
      value: props.dashBoardFromRdc.releaseOnSevenDaysProject,
      color: 'hsl(319, 70%, 50%)',
    },
  ];
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
        0
    );
    const SevenDaysLeftReleaseProjectList =
      props.projectFromRdc.lsProject.filter(
        (project) =>
          (new Date(project.TimeEnd).getTime() - new Date().getTime()) /
            (24 * 3600 * 1000) <=
          7
      );
    props.SetOnProgressProjectFunc(onProgressProject.length);
    props.SetReleaseProjectFunc(SevenDaysLeftReleaseProjectList.length);
  }

  useEffect(() => {
    filterProductDashboard();
  }, []);

  return (
    <>
      <MyResponsivePie
        data={[
          {
            id: 'Onprogress Projects',
            label: 'Onprogress Projects',
            value: props.dashBoardFromRdc.onProgressProject,
            color: 'hsl(62, 70%, 50%)',
          },
          {
            id: 'Release on next 7 days',
            label: 'Release on next 7 days',
            value: props.dashBoardFromRdc.releaseOnSevenDaysProject,
            color: 'hsl(319, 70%, 50%)',
          },
        ]}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOnPriority);
