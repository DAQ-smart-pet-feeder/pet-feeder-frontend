import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../styles/MealPlan.css';

const MealPlan = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [mealPlans, setMealPlans] = useState([]);

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newMealPlan = {
            days: formData.getAll('days'),
            time: formData.get('time'),
            portion: formData.get('portion'),
            enabled: true
        };
        setMealPlans([...mealPlans, newMealPlan]);
        setModalVisible(false);
    };

    const toggleMealPlan = (index) => {
        const updatedMealPlans = mealPlans.map((plan, i) => {
            if (i === index) {
                return { ...plan, enabled: !plan.enabled };
            }
            return plan;
        });
        setMealPlans(updatedMealPlans);
    };

    return (
        <>
            <NavBar />
            <div className='lock-font'>
                <button onClick={() => setModalVisible(true)}></button>
                <div className="meal-plan-container">
                {mealPlans.length === 0 ? (
                    <div className="no-schedule-message">
                        <p>No Schedules Set</p>
                        <button onClick={() => setModalVisible(true)}>Add Schedule</button>
                    </div>
                ) : (
                    mealPlans.map((plan, index) => (
                        // ... Render each meal plan
                        <p>test</p>
                    ))
                )}
                {modalVisible && (
                    <div className="modal">
                        <form onSubmit={handleSave}>
                            <fieldset>
                                <legend>Days of Week:</legend>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                    <label key={day}>
                                        <input type="checkbox" name="days" value={day} />
                                        {day}
                                    </label>
                                ))}
                            </fieldset>
                            <br/>
                            <label>
                                Time:
                                <input type="time" name="time" />
                            </label>
                            <br/>
                            <label>
                                Food Portion:
                                <input type="number" name="portion" />
                            </label>
                            <br/>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                )}
                {mealPlans.map((plan, index) => (
                    <div key={index} className="meal-plan-box">
                        <p>Time: {plan.time}</p>
                        <p>Days: {plan.days.join(', ')}</p>
                        <p>Portion: {plan.portion}</p>
                        <label>
                            Enable Schedule:
                            <input
                                type="checkbox"
                                checked={plan.enabled}
                                onChange={() => toggleMealPlan(index)}
                            />
                        </label>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

export default MealPlan;

// ต้องให้ส่งไป backend หลังจากกด save แล้ว เวลาที่กลับมาหน้านี้จะได้แสดงผลได้
