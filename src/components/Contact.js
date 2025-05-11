import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/contact', formData);
            alert(res.data.message);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert('Failed to send message');
        }
    };

    return (
        <section className="contact" id="contact">
            <h1 className="heading"> <span> contact </span> us </h1>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="name" className="box" value={formData.name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="email" className="box" value={formData.email} onChange={handleChange} />
                    <input type="text" name="phone" placeholder="number" className="box" value={formData.phone} onChange={handleChange} />
                    <textarea name="message" className="box" placeholder="message" cols="30" rows="10" value={formData.message} onChange={handleChange}></textarea>
                    <input type="submit" value="send message" className="bttn" />
                </form>
                <div className="image">
                    <img src="images/home/contact-img.svg" alt="contact" />
                </div>
            </div>
        </section>
    );
}

export default Contact;
