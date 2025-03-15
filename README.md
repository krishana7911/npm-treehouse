# npm-treehouse

`npm-treehouse` is a tool that visualizes the dependency tree of an `npm` package based on its `package.json` and `package-lock.json` files. It allows developers to explore and understand their project dependencies, detect duplicate versions, and optimize the package ecosystem using D3.js for an interactive graph visualization.

## Features

- **Generate package-lock.json**: Upload your `package.json` file, and the backend will generate the corresponding `package-lock.json`.
- **Interactive Dependency Graph**: Visualizes the package dependencies in an interactive graph, allowing users to explore the relationships between modules.
- **Optimize Dependencies**: Provides insights into duplicate versions of packages and offers suggestions for optimization.
- **Real-time Reporting**: Users can track real-time data from their `npm` project and explore the relationships between dependencies.
- **Alternative Safe Packages**: Users can see which packages are vulnerable and then find alternative to it which is secure.

## Getting Started

To get started with `npm-treehouse` locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=v14.x)
- [npm](https://npmjs.com/) (>=6.x)
- [Git](https://git-scm.com/)
- A text editor like [VS Code](https://code.visualstudio.com/)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/krishana7911/npm-treehouse.git
```
2. Navigate to the project directory:

```bash
cd npm-treehouse
```
3. Install the required dependencies:

```bash
npm install
```
### Running the Project
1. Start the development server:
```
npm run dev
```
2. Open your browser and visit http://localhost:3000 to see the project in action.

### Using the Tool
1. Upload package.json: Upload your project's package.json file.
2. Generate package-lock.json: The backend will automatically generate the package-lock.json based on the package.json.
3. View Dependency Graph: Once the package-lock.json is generated, you'll see an interactive graph that visualizes the dependencies of your project.

### Contributing
We welcome contributions to improve npm-treehouse! To contribute:

1. Fork the repository.
2. Create a new branch (`Example: git checkout -b improve-feature`).
3. Make the appropriate changes in the files.
4. Add changes to reflect the changes made.

### License
This project is licensed under the [MIT License](LICENSE)

### Acknowledgments
- Thanks to [D3.js](https://d3js.org/) for the amazing data-driven document manipulation library used for visualizing the dependency graph.

### Future Enhancements
- Node Version Selector: Allow users to select the Node.js version they want to use for generating the package-lock.json.
- Advanced Dependency Optimization: Suggest the most efficient ways to reduce package bloat by eliminating unused or outdated dependencies.
- Automated Dependency Audit: Automatically detect vulnerabilities in dependencies and suggest updates or fixes.

### Issues & Feedback
If you encounter any issues or have suggestions, feel free to open an issue on the [GitHub Issues page](https://github.com/krishana7911/npm-treehouse/issues)
