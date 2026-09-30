import React from 'react';

const EVENTS = [
  { id: 1, day: 'Mon', title: 'IT Society — AI Study Jam', time: '17:00', campus: 'Pretoria (Main)' },
  { id: 2, day: 'Wed', title: 'Marketplace Pop-up Swap Meet', time: '12:00', campus: 'Soshanguve North' },
  { id: 3, day: 'Fri', title: 'Career Fair — Faculty of ICT', time: '09:00', campus: 'Arcadia' },
];

export default function Schedule() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Campus life</div>
      <h1 className="page-title">Student schedule</h1>
      <p className="page-sub">Notices and events relevant to the EduTrade community.</p>
      <div className="table-wrap" style={{ marginTop: 24 }}>
        <table>
          <thead><tr><th>Day</th><th>Event</th><th>Time</th><th>Campus</th></tr></thead>
          <tbody>
            {EVENTS.map((e) => (
              <tr key={e.id}><td>{e.day}</td><td>{e.title}</td><td>{e.time}</td><td>{e.campus}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
