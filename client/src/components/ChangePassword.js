import React, { useState } from 'react'

export default function ChangePassword(props) {

    const [currentPass, updateCurrentPass] = useState('');
    const [newPass1, updateNewPass1] = useState('');
    const [newPass2, updateNewPass2] = useState('');

    const [badResponse, updateBadResponse] = useState('');


    const submitUpdate = async (e) => {
        e.preventDefault();
        const submitButton = e.target.lastChild;
        submitButton.innerHTML = 'Submitting...';
        submitButton.disabled = true;
        submitButton.classList.add('disabledButton');

        if (newPass1 !== newPass2 || newPass1 === '') {
            submitButton.innerHTML = 'Update Password';
            submitButton.disabled = false;
            submitButton.classList.remove('disabledButton');
            return updateBadResponse('Passwords do not match');
        }
        const data = {
            username: localStorage.getItem('user'),
            currentPassword: currentPass,
            newPassword: newPass1
        }

        await fetch('/users/updatePassword', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status !== 201) {
                submitButton.innerHTML = 'Update Password';
                submitButton.disabled = false;
                submitButton.classList.remove('disabledButton');
                return updateBadResponse('An error occured updating your password');
            } else {
                alert('Password has been updated!');
                props.history.push('/my-profile');
                window.location.reload(true);
            }
        })
    }




    return (
        <div id="resetPassword">
            <h1>Update your password!</h1>
            <form onSubmit={submitUpdate}>
                <label>Current Password:</label>
                <input type="password" value={currentPass} onChange={(e) => updateCurrentPass(e.target.value)} />
                <label>New Password:</label>
                <input type="password" value={newPass1} onChange={(e) => updateNewPass1(e.target.value)} />
                <label>Repeat Password:</label>
                <input type="password" value={newPass2} onChange={(e) => updateNewPass2(e.target.value)} />
                <button>Update Password</button>
            </form>
            <h3 className="badResponse">{badResponse}</h3>
        </div>
    )
}
