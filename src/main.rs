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

#[get("/client/<file..>")]
fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("client/public/build").join(file)).ok()
}

#[catch(404)]
fn not_found() -> Redirect {
    Redirect::to("/")
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index, files])
        .attach(Template::fairing())
        .register(catchers![not_found])
        .launch();
}