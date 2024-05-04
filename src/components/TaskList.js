import axios from "axios";

import { useState,useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif"



const TaskList = () =>{
    const [tasks,setTasks] = useState([]);
    const [comletedTasks,setComletedTasks] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [taskId,setTaskId] = useState("");
    const [formData,setFormData] = useState({
        name: "",
        completed : false
    });

    const {name} = formData;

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    };

    // fetch task

    const getTasks = async () =>{
        setIsLoading(true);
        try {
          const {data} = await axios.get(`${URL}/api/tasks`);
          setTasks(data);
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    useEffect(()=>{
        getTasks()
    },[])

    //Create Task
    const createTask = async (e)=>{
        e.preventDefault();
        if(name === ""){
            return toast.error("Input fields cannot be empty");
        }
        try {
            await axios.post(`${URL}/api/tasks`,formData);
            toast.success("Task added successfully")
            setFormData({
                ...formData,
                name: ""
            })
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    //Delete All tasks

    const deleteTask = async (id)=>{
        console.log(id)
        try {
            await axios.delete(`${URL}/api/tasks/${id}`);
            getTasks();
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Get single task to update
    const getSingleTask = async(task) =>{
        setFormData(
            {
                name : task.name,
                completed : false
            }
        );
        setTaskId(task._id)
        setIsEditing(true)
    }

    // update that task

    const updateTask = async(e) =>{
        e.preventDefault();
        if(name === ""){
            return toast.error("Input field Cannot be empty")
        }
        try {
           await axios.put(`${URL}/api/tasks/${taskId}`,formData);
           setFormData({
            ...formData,
            name : ""
           });
           setIsEditing(false);
           getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const setToComplete = async (task) =>{
        const newFormData = {
            name : task.name,
            completed : true,
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`,newFormData);
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        const cTask = tasks.filter((task)=>{
            return task.completed === true
        });
        setComletedTasks(cTask)
    },[tasks])


    const design = (
        <div>
            <h2>Task Manager</h2>
            <TaskForm 
            name={name} 
            handleInputChange={handleInputChange} 
            createTask={createTask} 
            isEditing={isEditing}
            updateTask={updateTask}
            />
            {tasks.length >0 && (<div className="--flex-between --pb">
                <p>
                    <b>Total Tasks:</b> {tasks.length}
                </p>
                <p>
                    <b>Completed Tasks:</b> {comletedTasks.length}
                </p>
            </div>)}
            
            <hr />
            {
                isLoading && (
                    <div className="--flex-center">
                        <img src={loadingImg} alt="Loading" />
                    </div>
                )
            }
            {
                !isLoading && tasks.length === 0 ? (<p>No Task Added.please add Task</p>) : (
                    <>
                    {
                    tasks.map((task,index)=>{
                        return (
                            <Task 
                            key={task._id} 
                            task={task} 
                            index={index} 
                            deleteTask={deleteTask} 
                            getSingleTask={getSingleTask}
                            setToComplete={setToComplete}
                            />
                        );
                    })
                    }
                    </>
                )
            }
        </div>
    );
    return design;
};

export default TaskList;


/* <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Personal Portfolio</title>
  </head>
  <body>
    <div class="scroll-up-btn">
      <i class="fas fa-angle-up"></i>
    </div>
    <!--Navbar-->
    <nav class="navbar">
      <div class="max-width">
        <div class="logo">
          <a href="#">Portfolio</a>
        </div>
        <ul class="menu">
          <li><a href="#home" class="menu-btn">Home</a></li>
          <li><a href="#about" class="menu-btn">About</a></li>
          <li><a href="#projects" class="menu-btn">Projects</a></li>
          <li><a href="#skills" class="menu-btn">Skills</a></li>
          <li><a href="#contact" class="menu-btn">Contact</a></li>
        </ul>
        <div class="menu-btn">
          <i class="fa fas fa-bars"></i>
        </div>
      </div>
    </nav>

    <!--home-->
    <section class="home" id="home">
      <div class="max-width">
        <div class="home-content">
          <div class="text-1">Hello, My name is</div>
          <div class="text-2">Sumit Khanduri</div>
          <div class="text-3">And I'm a <span>BCIT Student</span></div>
          <a href="#contact">Interested?</a>
        </div>
      </div>
    </section>

    <!-- about -->
    <section class="about" id="about">
      <div class="max-width">
        <h2 class="title">About Me</h2>
        <div class="about-content">
          <div class="col left">
            <img src="images/profile phot.webp" alt="profilePic" />
          </div>
          <div class="col right">
            <div class="content-head">I am <span>Sumit Khanduri</span></div>
            <p>
              I am a Computer Science Student at British Columbia Institute of
              Technology in Vancouver, British Columbia. I am currently looking
              for experiences to increase my knowledge pool in the computer
              science industry. Though I am not have much experience in the
              industry I cover up this lack with my eagerness to learn and
              ability to learn fast.
            </p>
            <a href="./SUMIT KHANDURI Resume - Resume (2).docx" download>
              Download Resume</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- projects -->

    <section class="projects" id="projects">
      <div class="max-width">
        <h2 class="title">My Projects</h2>
        <div class="projects-content">
          <div class="card olympic-k">
            <div class="box">
              <i class="fas fa-paint-brush"></i>
              <div class="text">Olympic-k</div>
              <p>
                Olympic-k is a prediction app for enhancing the Olympic watching
                experience. I built this project along with my team consisting
                of 3 members including me. As the project manager, I was
                responsible for handling the deadline along with coding.
              </p>
            </div>
          </div>

          <div class="card student-vote">
            <div class="box">
              <i class="fas fa-chart-line"></i>
              <div class="text">Student Vote</div>
              <p>
                StudentVote provides students and educational institutes a
                platform in which their voice can be heard and produce results.
                This app was built by a team of 4 people including me. I was
                responsible for making the backend work for this app.
              </p>
            </div>
          </div>

          <div class="card portfolio">
            <div class="box">
              <i class="fas fa-code"></i>
              <div class="text">Portfolio</div>
              <p>
                The page you are currently on is my portfolio. This project was
                made by only me. The purpose of this project is to showcase my
                proficiency in HTML, CSS, Javascript along with providing a link
                to my other projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- skills section -->

    <section class="skills" id="skills">
      <div class="max-width">
        <h2 class="title">My Skills</h2>
        <div class="skills-content">
          <div class="col left">
            <div class="bars">
              <div class="info">
                <span>HTML</span>
                <span>70%</span>
              </div>
              <div class="line html"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>CSS</span>
                <span>60%</span>
              </div>
              <div class="line css"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>Javascript</span>
                <span>70%</span>
              </div>
              <div class="line js"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>Java</span>
                <span>70%</span>
              </div>
              <div class="line java"></div>
            </div>
          </div>
          <div class="col right">
            <div class="bars">
              <div class="info">
                <span>MySQL</span>
                <span>70%</span>
              </div>
              <div class="line mysql"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>NodeJS</span>
                <span>50%</span>
              </div>
              <div class="line nodejs"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>BootStrap</span>
                <span>50%</span>
              </div>
              <div class="line bootstr"></div>
            </div>
            <div class="bars">
              <div class="info">
                <span>Firebase</span>
                <span>50%</span>
              </div>
              <div class="line fbase"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- contact section -->

    <section class="contact" id="contact">
      <div class="max-width">
        <h2 class="title">Contact Me</h2>
        <div class="contact-content">
          <div class="col left">
            <div class="text">Get in Touch</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              rerum sit distinctio minus dolorum consectetur sint error quisquam
              voluptate maiores?
            </p>
            <div class="icons">
              <div class="row">
                <i class="fas fa-user"></i>
                <div class="info">
                  <div class="head">Name</div>
                  <div class="sub-title">Sumit Khanduri</div>
                </div>
              </div>

              <div class="row">
                <i class="fas fa-map-marker-alt"></i>
                <div class="info">
                  <div class="head">Address</div>
                  <div class="sub-title">Vancouver, British Columbia</div>
                </div>
              </div>

              <div class="row">
                <i class="fas fa-envelope"></i>
                <div class="info">
                  <div class="head">Email</div>
                  <div class="sub-title">veerkhanduri@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col right">
            <div class="text">Message me</div>
            <form
              action="https://formsubmit.co/a41c55132a1f49080542b31049b8ec3f"
              method="post"
            >
              <div class="fields">
                <div class="field name">
                  <input
                    type="text"
                    id="Name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div class="field email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div class="field sub">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div class="textarea">
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    name="message"
                    id="message"
                    required
                  ></textarea>
                </div>
                <div class="button">
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <span
        >Created By Sumit Khanduri
        <span class="far fa-copyright"></span> 2022</span
      >
      <div class="icons">
        <a
          href="https://www.instagram.com/_sumit_26_11/"
          class="icon icon-insta"
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/sumit-khanduri-684454240/"
          class="icon icon-linkedin"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/Sumitk2611" class="icon icon-github">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </footer>

    <script src="script.js"></script>
  </body>
</html> */