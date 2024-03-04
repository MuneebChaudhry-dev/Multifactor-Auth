# Multifactor-Auth

A web interface developed for two-factor authentication of user using Google Authenticator or Authy.

## Getting Started

These guidelines will assist you in obtaining a copy of the project, enabling its execution on your local machine for development purposes. Refer to deployment notes for instructions on deploying the project on a live system.

## Prerequisites

- **Node.js >= 18**

  - Download and install the latest version of Node.js from [nodejs.org](https://nodejs.org).
  - _(Recommended)_ Use [nvm](https://github.com/nvm-sh/nvm) for version management.

- **Package Manager: npm or yarn**
  - **npm:** It comes bundled with Node.js. Verify its installation by running `npm -v` in your terminal.
  - **yarn:** If you prefer using yarn, install it globally by following the instructions on [yarnpkg.com](https://yarnpkg.com).

## Project Installation and Execution

1. Clone the repo in your desired directory

```bash
git@github.com:MuneebChaudhry-dev/Multifactor-Auth.git
```

2. Install the project dependencies by using the following command

```bash
yarn install
```

OR

```bash
npm install
```

3. Set your api path in `.env` file

4. Run the project using the provided script

```bash
yarn dev
```

Now the project start running on your local machine.

## Deployment

### Prerequisites

Before deploying to the server, it is recommended to test the application locally to avoid any errors. Run the following script:

```bash
yarn build
```

## Built With

- [Vue3](https://vuejs.org/) - The frontend framework used
- [yarn](https://yarnpkg.com/) - Pacakge Manager
- [Tailwind](https://tailwindcss.com/) - Used to style the components
- [Pinia](https://pinia.vuejs.org/) - Used to manage states

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/spongeling/sponge-ui/tags).

## Contributors

| Contributor  | Role               |
| ------------ | ------------------ |
| Muneeb Ahmad | Frontend Developer |
