import React from "react";
import Button from "../../utils/Button";
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";
function ContactDetails() {
  return (
    <div className="container mx-auto py-8 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
          <form action="#">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Typography variant="h8" color="blue-gray" className="mb-1">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="h8" color="blue-gray" className="mb-1">
                  Your Email Address
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <Typography variant="h8" color="blue-gray" className="mb-1">
                Your Email Address
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h8" color="blue-gray" className="mb-1">
                Your Message
              </Typography>
              <div className="w-full">
                <Textarea label="Message" />
              </div>
            </div>
            <div>
              <Button title="SEND MESSAGE" />
            </div>
          </form>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">Get in Touch</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eget leo at velit imperdiet varius. In eu ipsum vitae velit congue
            iaculis vitae at risus.
          </p>
          <hr className="my-4" />
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-4">The Office</h2>
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <i className="fas fa-map-marker-alt" />
              </div>
              <h3>
                <strong>Address:</strong> 532, Gomti Nagar, Lucknow
              </h3>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <i className="fa fa-phone" />
              </div>
              <h3>
                <strong>Phone:</strong> 9877766982
              </h3>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <i className="fa fa-envelope" />
              </div>
              <h3>
                <strong>Email:</strong> easydeals@example.com
              </h3>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <h2 className="text-lg font-bold mb-4">Business Hours</h2>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <i className="far fa-clock" />
              </div>
              <h3>Monday - Friday: 9am to 5pm</h3>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <i className="far fa-clock" />
              </div>
              <h3>Saturday: 9am to 2pm</h3>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <i className="far fa-clock" />
              </div>
              <h3>Sunday: Closed</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
