import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
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
        <div className='lock-font'>
            <NavBar />
            <div className='meal-plan-container'>
                <button onClick={() => setModalVisible(true)}>Add Schedule</button>
                {mealPlans.length === 0 ? (
                    <div className="no-schedule-message">
                        <h1>No Schedules Set</h1>
                    </div>
                ) : (
                    mealPlans.map((plan, index) => (
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
                    ))
                )}
                {/* {modalVisible && (
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
                )} */}
                <Modal 
                    isVisible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                    onSave={handleSave} 
                />
            </div>
        </div>
    );
};

export default MealPlan;
