function DashboardCard({ title, body, margin }) {
  return (
    <div
      className={`border border-gray-400 p-6 rounded my-${margin} md:my-0 mx-0 md:mx-${margin}`}
      style={{ boxShadow: '0 2px 0 0 rgba(0,0,0,.03)', minWidth: '210px' }}
    >
      <h3 className="opacity-75 font-bold pb-2 text-center">{title}</h3>
      <p className="text-center mx-4 border-t pt-4 text-xl">{body}</p>
    </div>
  );
}

export default function Dashboard({ user }) {
  return (
    <div className="flex-1 flex justify-center px-4 pt-10 md:pt-20 pb-20 border">
      <div>
        <h1 className="text-3xl font-bold pb-4">Hello, {user.username} 👋</h1>
        <h2 className="text-lg pb-12">Here's some of your activity</h2>
        <div className="flex flex-col md:flex-row justify-center">
          <DashboardCard title="Surveys created" body={user.surveysCreated} />
          <DashboardCard
            title="Emails sent"
            body={user.emailsSent}
            margin={6}
          />
          <DashboardCard
            title="Responses received"
            body={user.responsesReceived}
          />
        </div>
      </div>
    </div>
  );
}
