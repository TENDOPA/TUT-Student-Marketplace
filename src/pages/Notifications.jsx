import React from 'react';

const NOTIFS = [
  { id: 1, text: 'Katekani S. sent you a message about "Dell Latitude 5410".', time: '2h ago' },
  { id: 2, text: 'Your listing "Engineering Mathematics N4 Textbook" got a new favourite.', time: '5h ago' },
  { id: 3, text: 'Welcome to EduTrade! Complete your profile to build trust with buyers.', time: '1d ago' },
];

export default function Notifications() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Updates</div>
      <h1 className="page-title">Notifications</h1>
      <div className="table-wrap" style={{ marginTop: 20 }}>
        <table>
          <tbody>
            {NOTIFS.map((n) => (
              <tr key={n.id}>
                <td>{n.text}</td>
                <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{n.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
