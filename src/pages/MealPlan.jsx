import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import '../styles/MealPlan.css';

const MealPlan = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [mealPlans, setMealPlans] = useState([]);

    const fetchMealPlans = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/pet-feeder-api/v3/get-meal-plan-data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
    
            const transformedData = data.map(item => ({
                days: item.day,
                time: item.time,
                portion: item.por.toString(),
                enabled: item.enable_status === 1,
                schedule_id: item.schedule_id
            }));
            console.log(transformedData);
    
            setMealPlans(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        fetchMealPlans();
    }, []);

    const handleSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newMealPlan = {
            days: formData.getAll('days'),
            time: formData.get('time'),
            portion: formData.get('portion'),
            enabled: true
        };
        const newScheduleId = mealPlans.length;
        const postData = {
            days: newMealPlan.days,
            enable_status: newMealPlan.enabled ? 1 : 0,
            por: parseInt(newMealPlan.portion, 10),
            schedule_id: newScheduleId,
            time: newMealPlan.time
        };
    
        try {
            const response = await fetch('http://localhost:8080/pet-feeder-api/v3/post-meal-plan-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseJson = await response.json();
            console.log('Success:', responseJson);
    
            setMealPlans([...mealPlans, { ...newMealPlan, schedule_id: newScheduleId }]);
        } catch (error) {
            console.error('Error:', error);
        }
    
        setModalVisible(false);
    };
    

    const toggleMealPlan = async (index) => {
        const updatedMealPlans = mealPlans.map((plan, i) => {
            if (i === index) {
                return { ...plan, enabled: !plan.enabled };
            }
            return plan;
        });

        setMealPlans(updatedMealPlans);
    
        const planToUpdate = updatedMealPlans[index];
        const postData = {
            schedule_id: planToUpdate.schedule_id,
            days: planToUpdate.days,
            por: parseInt(planToUpdate.portion, 10),
            time: planToUpdate.time,
            enable_status: planToUpdate.enabled ? 1 : 0
        };
    
        try {
            const response = await fetch('http://localhost:8080/pet-feeder-api/v3/post-meal-plan-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            console.log('Update successful');
        } catch (error) {
            console.error('Error updating meal plan:', error);
        }
    };
    
    
    
    return (
        <div className='lock-font'>
            <NavBar />
            <div className='header-text'>Meal Plan</div>
            <div className='meal-plan-container'>
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
                <button className="button-74" onClick={() => setModalVisible(true)}>Add Schedule</button>
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
