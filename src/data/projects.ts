export interface Project {
  id:          string
  title:       string
  description: string
  stack:       string[]
  liveUrl?:    string
  githubUrl?:  string
  imageBg:     string // gradient or color for the image placeholder area
}

export const projects: Project[] = [
  {
    id:          'project-1',
    title:       '[TO Do LIST]',
    description: '[A simple To-Do List application built with React that allows users to add, edit, and delete tasks.]',
    stack:       ['Java Script', 'Css', 'Html'],
    imageBg:       '/projects/ToDo.png',
    liveUrl:     'https://to-do-list-beta-blue-88.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/To_Do_List.git',
    // imageBg:     'linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0f2060 100%)',
  },
  {
    id:          'project-2',
    title:       '[Temperature Converter]',
    description: '[A simple Temperature Converter application that converts values between Celsius, Fahrenheit, and Kelvin.]',
    stack:       ['Html'],
    imageBg:       '/projects/Temperature-Convert.png',
    liveUrl:     'https://temperature-converter-three-orpin.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/Temperature_Converter.git',
    // imageBg:     'linear-gradient(135deg, #001833 0%, #003366 50%, #00488a 100%)',
  },
  {
    id:          'project-3',
    title:       '[Military Academy]',
    description: '[A responsive informational web application that helps students understand military college admission requirements, application procedures, and key deadlines, presented in a clean and easy-to-navigate interface.]',
    stack:       ['Html', 'Css', 'Bootstrap'],
    imageBg:       '/projects/Military-Academy.png',
    liveUrl:     'https://final-project-nti-five.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/Final_Project_NTI.git',
    // imageBg:     'linear-gradient(135deg, #0a0020 0%, #1a0060 45%, #4c1ba6 100%)',
  },
   {
    id:          'project-4',
    title:       '[Dashboard Master]',
    description: '[A responsive admin dashboard built with modern web technologies, designed to visualize and manage data through an intuitive interface with organized sections and reusable components.]',
    stack:       ['Vite'],
    imageBg:       '/projects/Dashboard.png',
    liveUrl:     'https://dashboard-master-lime.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/Dashboard-Master.git',
    // imageBg:     'linear-gradient(135deg, #001833 0%, #003366 50%, #00488a 100%)',
  },
  {
    id:          'project-5',
    title:       '[Car selling website]',
    description: '[A responsive car selling platform where users can explore listed cars, view detailed specifications, and compare options through a clean and intuitive interface.]',
    stack:       ['Html , Css , Java Script , Bootstrap , React'],
    imageBg:       '/projects/Selling-Company.png',
    liveUrl:     'https://project-graduation-frontend-amber.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/Project_Graduation_Frontend.git',
    // imageBg:     'linear-gradient(135deg, #0a0020 0%, #1a0060 45%, #2d0080 100%)',
  },
  {
    id:          'project-6',
    title:       '[Calculator]',
    description: '[A responsive calculator application built with React, designed to handle basic mathematical operations with fast performance and an intuitive UI.]',
    stack:       ['Html , Css , Java Script'],
    imageBg:       '/projects/Calculater.png',
    liveUrl:     'https://calculator-five-nu-95.vercel.app',
    githubUrl:   'https://github.com/ahmed3012001/Calculator.git',
    // imageBg:     'linear-gradient(135deg, #001833 0%, #003366 50%, #00488a 100%)',
  },
]
