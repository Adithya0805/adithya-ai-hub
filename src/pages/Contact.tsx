import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message too short").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast({ title: "Please check the form", description: r.error.issues[0].message, variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks — I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="container py-20 grid lg:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <p className="text-sm text-primary font-medium">Contact</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Let's talk</h1>
          <p className="mt-4 text-muted-foreground">
            Have an opportunity, a question, or just want to say hi? Drop a message — I read every email.
          </p>
          <div className="mt-8 space-y-3">
            <a href="mailto:adithyaadhi0805@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
              <Mail className="w-5 h-5 text-primary" /> adithyaadhi0805@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/adithya-k-76baab204/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
              <Linkedin className="w-5 h-5 text-primary" /> LinkedIn
            </a>
            <a href="https://github.com/Adithya0805" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
              <Github className="w-5 h-5 text-primary" /> GitHub
            </a>
            <a href="https://wa.me/918825714576" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
              <MessageCircle className="w-5 h-5 text-primary" /> WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="bg-gradient-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
          </div>
          <div>
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
          </div>
          <Button type="submit" variant="hero" className="w-full">Send Message</Button>
        </form>
      </section>
    </Layout>
  );
};

export default Contact;
