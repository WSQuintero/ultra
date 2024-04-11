import { useCountdown } from '../hooks/UseCountdown';
import Timer from "../components/Timer";

const CountdownTimer = ({ targetDate }) => {
  const getNextFriday = () => {
    const today = new Date();
    const nextFriday = new Date(today);

    const currentDay = today.getDay();
    const daysUntilNextFriday = currentDay === 5 ? 7 : (5 - currentDay + 7) % 7;
    
    nextFriday.setDate(today.getDate() + daysUntilNextFriday);

    nextFriday.setHours(23, 59, 59, 999);

    return nextFriday;
  };

  const [days, hours, minutes, seconds] = useCountdown(getNextFriday());
  
  console.log(days)
  console.log(hours)
  console.log(minutes)
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <Timer
        days={days}
        hours={hours}
        minutes={minutes}
      />
    );
  }
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

export default CountdownTimer;
