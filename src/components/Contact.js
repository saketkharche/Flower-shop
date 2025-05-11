import React from 'react'

function Contact() {
    return (
        <div>
            <section className="contact" id="contact">

                <h1 className="heading"> <span> contact </span> us </h1>

                <div className="row">

                    <form action="">
                        <input type="text" placeholder="name" className="box" />
                        <input type="email" placeholder="email" className="box" />
                        <input type="phone" placeholder="number" className="box" />
                        <textarea name="" className="box" placeholder="message" id="" cols="30" rows="10"></textarea>
                        <input type="submit" value="send message" className="bttn" />
                    </form>

                    <div className="image">
                        <img src="images/home/contact-img.svg" alt="" />
                    </div>

                </div>

            </section>
        </div>
    )
}

export default Contact
