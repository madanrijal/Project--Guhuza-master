import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Guhuza is an innovative Canadian recruiting platform that goes
            beyond the features of a traditional job board. It uses breakthrough
            technology to instantly match employers and job seekers for the
            ultimate hiring experience.
          </p>
        </div>
      </section>
      <div className="mt-8 w-full h-[500px]">
        <Image
          src="/assets/team.jpg"
          alt="Team collaboration"
          height={600}
          width={1200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Together we are strong Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Together we are strong</h2>
            <p className="text-gray-600 mb-4">
              Your Advantage Awaits Development for GUHUZA started in 2020.
              GUHUZA is an alternative to the traditional job board and is a
              revolutionary platform that offers employers and job seekers the
              ability to interview directly on our system.
            </p>
            <p className="text-gray-600">
              Our advanced technology matches the job seekers profile with jobs
              on our site and ranks them for employers based on skills required
              for the position. Once the match has been made, live interviews
              can be conducted right through our platform.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full overflow-hidden">
                <Avatar>
                  <AvatarFallback>{"Brandon Shaw".charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <p className="font-medium">Brandon Shaw</p>
            </div>
            <blockquote className="text-xl font-medium">
              " Traditional hiring processes are slow and time consuming
              involving many steps that sometimes leads to disappointing
              results. From preparing a job description to drawing up an offer -
              employers spend an average of 36 days finding the right hire."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">290+</p>
            <p className="text-gray-600">
              Team members who are at different domains
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">12+</p>
            <p className="text-gray-600">
              Year experience with our successful processes
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">20K+</p>
            <p className="text-gray-600">
              Yearly customers were pay at fruitful processes
            </p>
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Join our team</h2>
        <p className="text-gray-600 max-w-2xl">
          We believe it takes great people to make a great product. That's why
          we hire not only the perfect professional fit, but people who embody
          our values.
        </p>
        <Button className="mt-6">View Details</Button>
      </section>

      {/* Contact Section */}
      <section className="bg-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Have a question?
              <br />
              Our team is happy to assist you
            </h2>
            <p className="mb-8">
              Get quick answers to your questions about our products or anything
              else. Our highly trained team are standing by ready to help.
            </p>
            <Button className="bg-white text-teal-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone className="w-6 h-6" />
              Contact Us
            </Button>
          </div>
          <div className="">
            <Image
              src="/assets/support.svg"
              alt="Customer support"
              height={400}
              width={600}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
