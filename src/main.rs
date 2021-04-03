#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use std::path::{Path, PathBuf};
use rocket::response::{NamedFile, Redirect};
use rocket_contrib::templates::Template;

#[get("/")]
fn index() -> Template {
    let map = ();
    Template::render("index", &map)
}

#[get("/client/static/<file..>", rank = 2)]
fn files_static(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("client/static").join(file)).ok()
}

#[get("/client/<file..>", rank = 3)]
fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("client/public/build").join(file)).ok()
}

#[catch(404)]
fn not_found() -> Redirect {
    Redirect::to("/")
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index, files_static, files])
        .attach(Template::fairing())
        .register(catchers![not_found])
        .launch();
}