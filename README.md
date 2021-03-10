# Obacht! App Development Setup
Powered by Rocket and Svelte

![Setup Diagram](https://github.com/obacht-tech/app_development/blob/master/doc/setup-diagram.png)

## Tools

|Tool|Language|Docs|Usage|
|---|---|---|---|
|Rocket|Rust|[Rocket Docs](https://rocket.rs/v0.4/guide/)|Backend / Server
|Svelte|TypeScript|[Svelte Docs](https://svelte.dev/docs)|Frontend Framework / Preprocessor
|Three|TypeScript|[Three Docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)|WebGL Framework

## Development

Make sure all languages dependencies are installed:

### Language Dependencies

- [Rust](https://rustup.rs/)
- [NodeJS / NPM](https://nodejs.org/en/)

### Rust Nightly for Rocket

Once rustup is installed, configure Rust nightly as your default toolchain by running the command:

`rustup default nightly`

If you prefer, once we setup a project directory in the following section, you can use per-directory overrides to use the nightly version only for your Rocket project by running the following command in the directory:

`rustup override set nightly`

### Startup

#### Rocket

Start Rocket using your IDE or using `cargo run`
Rust has no live reloading feature. If there are any changes to the server cargo has to be restarted.

#### Svelte

First change to the client folder
`cd client`

Start Svelte with hot reload `npm run dev`

Or build Svelte once `npm run build`
