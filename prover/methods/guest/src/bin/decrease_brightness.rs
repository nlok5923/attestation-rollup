// Copyright 2023 RISC Zero, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![no_main]

use std::io::Read;

use ethabi::{ethereum_types::U256, ParamType, Token};
use image::codecs::png::PngEncoder;
use image::{load_from_memory, ImageOutputFormat};
use image::{DynamicImage, GenericImageView, Rgba, RgbaImage};
use risc0_zkvm::guest::env;
// use image_png::PngEncoder;
// use std::fs::File;
// use std::io::Write;
use base64::{decode, encode};
risc0_zkvm::guest::entry!(main);
use std::io::Cursor;

fn decrease_brightness(base64_string: &str) -> String {
    let image_data = decode(base64_string).expect("Failed to decode base64 string");

    // Load the image from memory
    let img = load_from_memory(&image_data).expect("Failed to load image");

    let brighter_img = img.adjust_contrast(-30.0);

    let rgb_image = brighter_img.to_rgb8();

    // Create a buffer to hold the PNG data
    let mut buffer = Vec::new();

    // Create a new PngEncoder that writes to the buffer
    let encoder = PngEncoder::new(&mut buffer);

    // Encode the brighter image as PNG and write to the buffer
    encoder
        .encode(
            &rgb_image,
            rgb_image.width(),
            rgb_image.height(),
            image::ColorType::Rgb8,
        )
        .expect("Failed to encode image");

    // Convert the buffer to a base64 string
    let base64_image = encode(&buffer);
    println!("Brighter Image Base64: {}", base64_image);

    base64_image
}

fn main() {
    // Read data sent from the application contract.
    let mut input_bytes = Vec::<u8>::new();
    env::stdin().read_to_end(&mut input_bytes).unwrap();

    let base64_string = String::from_utf8_lossy(&input_bytes);
    let base64_str = &base64_string;

    // Invert colors
    // let inverted_image_data = invert_colors(base64_str);
    let inverted_image_data = decrease_brightness(base64_str);

    let encoded_hello = ethabi::encode(&[Token::String(String::from(inverted_image_data))]);
    env::commit_slice(&encoded_hello);
}
