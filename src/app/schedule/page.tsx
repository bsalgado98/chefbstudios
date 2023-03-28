'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css';

function Schedule() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<unknown>(null)

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/schedule-form", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) throw new Error("'Annie are you ok?' ... 'No'");

            setSubmitSuccess(true)
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            setSubmitError(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const formElement = 
        <form className={styles.contactForm} onSubmit={handleFormSubmit}>
            <div className={styles.contactFormRow}>
                <label htmlFor='name'>Name</label>
                <input
                    name="name"
                    value={formData.name}
                    type={'text'}
                    required
                    onChange={handleFormChange}
                ></input>
            </div>
            <div className={styles.contactFormRow}>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    value={formData.email}
                    type={'text'}
                    required
                    onChange={handleFormChange}
                ></input>
            </div>
            <div className={styles.contactFormRow}>
                <label htmlFor='subject'>Subject</label>
                <input
                    name='subject'
                    value={formData.subject}
                    type={'text'}
                    required
                    onChange={handleFormChange}
                ></input>
            </div>
            <div className={styles.contactFormRow}>
                <label htmlFor='message'>Message</label>
                <textarea
                    name='message'
                    value={formData.message}
                    cols={40}
                    rows={10}
                    required
                    onChange={handleFormChange}
                ></textarea>
            </div>
            <div className={styles.contactFormRow}>
                <button type={"submit"}>{ isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>
        </form>
    
    const formSuccessElement = 
        <div className={styles.formSuccess}>
            <svg viewBox="0 0 50 50" width="400px" height="400px">
                <path d="M15,30 L25,40 L35,20" stroke="#00ff00" stroke-width="3" fill="none"
                        stroke-dasharray="82, 82" stroke-dashoffset="82">
                    <animate attributeName="stroke-dashoffset" values="82; 0" dur="3000ms" begin="0s"
                            fill="freeze" />
                </path>
                <path d="M16,31 L25,40 L34.5,21" stroke="#000" stroke-width="2" fill="none"
                        stroke-dasharray="82, 82" stroke-dashoffset="82">
                    <animate attributeName="stroke-dashoffset" values="82; 0" dur="1000ms" begin="0s"
                            fill="freeze" />
                </path>
            </svg>
            <h1>Submission success!</h1>
            <button onClick={() => setSubmitSuccess(false)}>Send a new thing</button>
        </div>

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.landingHero}>
                <div className={styles.heroLeft}>
                    <h1>Schedule some</h1>
                    <h1>time with me</h1>
                    <h3>Or just send some compliments to the "chef"</h3>
                </div>
                <div className={styles.heroRight}>
                    <div className={styles.formPaper}>
                        {submitSuccess ? formSuccessElement : formElement}
                        {submitError ? <p>{submitError.toString()}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule