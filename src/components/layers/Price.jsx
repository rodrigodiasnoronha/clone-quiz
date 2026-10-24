import Rich from '../Rich.jsx';
import Countdown from '../Countdown.jsx';

export default function Price({ content: c }) {
  return (
    <div>
      <div className="countdown">⏰ Your discount expires in <Countdown id="quiz-deadline" minutes={10} /></div>
      <div className="price">
        {c.featured && <div className="feat">{c.featured}</div>}
        <div className="body">
          <Rich html={c.title} />
          <div className="box">{c.before}<b>{c.value}</b>{c.after}</div>
        </div>
      </div>
    </div>
  );
}
