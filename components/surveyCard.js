import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PieChart } from 'react-minimal-pie-chart';

export default function SurveyCard({ survey }) {
  const {
    title,
    dateSent,
    yes,
    no,
    subject,
    body,
    recipientsAmount,
    lastResponded,
  } = survey;
  const votesAmount = yes + no;

  const hasVotes = votesAmount > 0;

  const chartData = hasVotes
    ? [
        {
          title: 'Yes',
          value: yes,
          color: '#0197F6',
        },
        { title: 'No', value: no, color: '#D7263D' },
      ]
    : [
        {
          title: 'empty',
          value: 1,
          color: '#9C9990',
        },
      ];

  return (
    <article
      //style={{ minWidth: '400px' }}
      className="bg-white shadow rounded-lg border border-gray-100 w-full md:w-1/3 lg:w-1/4 mb-10 md:my-6 md:mx-6"
    >
      <header className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <span className="text-xs">{new Date(dateSent).toDateString()}</span>
      </header>
      <div className="p-6 flex justify-center">
        <div>
          <fieldset className="border px-4 py-2 mb-6">
            <legend className="text-sm font-medium">Recipients</legend>
            <div className="flex justify-evenly">
              <div className="">Amount: {recipientsAmount}</div>
              <div>
                Responded: {votesAmount} (
                {(votesAmount / recipientsAmount) * 100}%)
              </div>
            </div>
          </fieldset>
          <fieldset className="border px-4 py-2 mb-6">
            <legend className="text-sm font-medium">Email subject line</legend>
            <div className="">{subject}</div>
          </fieldset>
          <fieldset className="border px-4 py-2">
            <legend className="text-sm font-medium">Email body</legend>
            <div className="">{body}</div>
          </fieldset>
          <div className="pt-6 flex">
            <PieChart
              lineWidth={20}
              data={chartData}
              label={({ dataEntry }) => {
                if (hasVotes) {
                  return Math.round(dataEntry.percentage) + '%';
                }
              }}
              labelStyle={{ fontSize: '8px', fill: 'black' }}
              labelPosition={60}
              style={{
                height: '150px',
                flex: '1.5',
              }}
            />
            <div className="flex-1 flex flex-col justify-center items-start">
              <div className="font-bold pl-4 py-1">
                <FontAwesomeIcon
                  icon="circle"
                  color="#0197F6"
                  className="mr-1"
                />{' '}
                Yes: {yes}
              </div>
              <div className="font-bold pl-4 py-1">
                <FontAwesomeIcon
                  icon="circle"
                  color="#D7263D"
                  className="mr-1"
                />{' '}
                No: {no}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
