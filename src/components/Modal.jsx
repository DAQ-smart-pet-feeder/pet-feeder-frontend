import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isVisible, onClose, onSave }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content" style={{ animation: 'fadeIn 0.5s' }}>
                <form onSubmit={onSave}>
                    <fieldset>
                        <legend>Days of Week:</legend>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <label key={day}>
                                <input type="checkbox" name="days" value={day} />
                                {day}
                            </label>
                        ))}
                    </fieldset>
                    <br />
                    <label>
                        Time:
                        <input type="time" name="time" />
                    </label>
                    <br />
                    <label>
                        Food Portion:
                        <input type="number" name="portion" min="1" max="10" step="1"/>
                    </label>
                    <br />
                    <button className="button-17" type="submit">Save</button>
                    <button className="button-17" type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
