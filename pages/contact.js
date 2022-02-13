import React, { useState } from 'react';
import GithubIcon from '../components/Github-icon';
import LinkedinIcon from '../components/LinkedinIcon';
import Layout from '/containers/Layout';
import styles from '/styles/contactpage.module.css'


export default function contact() {

  const [message, setMessage] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Pricing')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')

    let data = {
        name,
        email,
        subject,
        title,
        body

      }

    fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        console.log('Response received')
        if (res.status === 200) {
          console.log('Response succeeded!')
          setName('')
          setEmail('')
          setSubject('')
          setTitle('')
          setBody('')
          setSubmitted(true)
          setMessage('Email Sent Successfully')
        }
      })
    }

  return (
  <div>
      <Layout>
        <div class={styles.container}>
          <div class={styles.leftSide}>
            <h1 className={styles.title}>Contact Me</h1>
            <h3 className={styles.title}>

              {message != '' ? message: ''}

            </h3>
            <div className={styles.icons}>
              <a className={styles.link} href="https://github.com/shutt90">
                <GithubIcon className={styles.github}/>
              </a>
              <a className={styles.link} href="https://www.linkedin.com/in/liam-pugh-2102089b/">
                <LinkedinIcon className={styles.linkedin}/>
              </a>
            </div>
            <p className={styles.qdetails}><strong>E:</strong> hello@liampugh.co.uk</p>
            <p className={styles.details}><strong>T:</strong> 07391 605016</p>
          </div>
          <div class={styles.rightSide}>
            <form method="post" action="/api/contact/">
                <input required className={styles.textInput} placeholder="Name" type="input" onChange={(e)=>{setName(e.target.value)}} name="name" id="name"></input>
                <input required className={styles.textInput} placeholder="Your Email" type="email" onChange={(e)=>{setEmail(e.target.value)}} name="email" id="email"></input>
                <select required className={styles.selectInput} type="dropdown" onChange={(e)=>{ setSubject(e.target.value)}} name="subject" id="subject">
                    <option className={styles.option} value="Pricing" name="pricing" id="pricing">Pricing</option>
                    <option className={styles.option} value="Collab" name="collab" id="collab">Collaboration</option>
                    <option className={styles.option} value="Discussion" name="discussion" id="discussion">Discussion</option>
                </select>
                <input required className={styles.textInput} placeholder="Title" type="input" onChange={(e)=>{setTitle(e.target.value)}} name="title" id="title"></input>
                <textarea required className={styles.textarea} placeholder="Body" name="body" onChange={(e)=>{setBody(e.target.value)}} id="body"></textarea>
                
                <input className="submit-btn" type="submit" onClick={(e) => handleSubmit(e)}></input>
            </form>
          </div>
        </div>
      </Layout>
  </div>
  );
}