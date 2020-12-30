const contentData = [
  {
    title: "Front End (React.js)",
    link: "https://reactjs.org/",
    description:
      "The frontend was created using React functional components and React Hooks. The styling comes from Bootstrap. After logging in, the app requests a token from Auth0 and then uses that token to access the Person Info API.",
  },
  {
    title: "Web API & SQL Database (Azure Cloud)",
    link: "https://drewapiwebapp.azurewebsites.net/",
    description:
      "The Person Info API is a Secure Web API is hosted on Azure and features the ability to perform CRUD operations on a database. The app makes a request to the API, which then updates the database. A Person consists of an Id, and a First and Last Name.",
  },
  {
    title: "CI/CD (Azure DevOps)",
    link: "https://azure.microsoft.com/",
    description:
      "This app features Continuous Integration and Continuous Deployment to Azure and keeps sensitive information safe by replacing tokens with build pipeline variables.",
  },
  {
    title: "Security (Auth0)",
    link: "https://auth0.com/",
    description:
      "This app features HTTPS and Universal Login and Token-based API authentication and authorization provided by Auth0. The API and Auth0 Application both have a CORS policy to only allow specific request origins.",
  },
  {
    title: "Unit Testing (xUnit)",
    link: "https://xunit.net/",
    description:
      "This app features 14 unit tests which test the database connection class for correct functionality. These tests are run automatically by the build pipeline.",
  },
];

export default contentData;
