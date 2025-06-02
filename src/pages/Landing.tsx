import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slide, Fade, Zoom } from 'react-awesome-reveal';
import { ModeToggle } from "@/components/mode-toggle";
import { Award, CheckCircle, Clock, Shield, Search, ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function LandingPage() {
  return (
    <div className={cn("min-h-screen flex flex-col")}>
      {/* Header with subtle animation */}
      <Fade cascade triggerOnce={true} duration={800}>
        <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-10">
          <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-4">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Award className="h-8 w-8 text-orange-400" />
              <h1 className="text-2xl font-bold">TechCognita Certificate Verification</h1>
            </div>
            <ModeToggle />
          </div>
        </header>
      </Fade>

      {/* Main Content Area - Landing Page Sections */}
      <main className="flex-grow">
        {/* Hero Section with enhanced animations */}
        <section className="bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90 py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
          
          <div className="container mx-auto text-center relative z-10">
            <Fade direction="up" triggerOnce={true} duration={1000} cascade>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">Verify Your Certificate Instantly</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">Our system provides a quick and secure way to verify the authenticity of certificates issued by TechCognita.</p>
            </Fade>
            
            <Zoom triggerOnce={true} delay={300}>
              <Link to="/verify">
                <Button className="bg-[#f97316] hover:bg-[#f97316]/90 text-white text-lg px-8 py-6 rounded-full group transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
                  <Search className="mr-2 h-5 w-5" />
                  Verify Certificate
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Zoom>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Fade direction="up" triggerOnce={true} delay={400} cascade>
                <Card className="bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center">
                    <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold">Trusted Verification</h3>
                    <p className="text-muted-foreground text-center">Secure and reliable certificate validation</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center">
                    <Clock className="h-10 w-10 text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold">Instant Results</h3>
                    <p className="text-muted-foreground text-center">Get verification results in seconds</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center">
                    <Shield className="h-10 w-10 text-purple-500 mb-4" />
                    <h3 className="text-lg font-semibold">Secure System</h3>
                    <p className="text-muted-foreground text-center">Protected by advanced security measures</p>
                  </CardContent>
                </Card>
              </Fade>
            </div>
          </div>
        </section>

        {/* How it Works Section with animated steps */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <Fade direction="up" triggerOnce={true} delay={200}>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">How it Works</h2>
                <Separator className="w-24 h-1 bg-orange-500 mx-auto" />
              </div>
            </Fade>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-500/30 hidden md:block" />
              
              {/* Step 1 */}
              <Fade direction="left" triggerOnce={true} delay={300} cascade>
                <div className="flex flex-col items-center relative z-10">
                  <div className="bg-orange-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-orange-500/20 relative">
                    <span>1</span>
                    <span className="absolute -top-1 -right-1 bg-background rounded-full p-1">
                      <Search className="h-5 w-5 text-orange-500" />
                    </span>
                  </div>
                  <Card className="w-full bg-background border-orange-500/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Input Certificate ID</h3>
                      <p className="text-muted-foreground">Enter the unique Certificate ID found on your certificate.</p>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
              
              {/* Step 2 */}
              <Fade direction="up" triggerOnce={true} delay={500} cascade>
                <div className="flex flex-col items-center relative z-10">
                  <div className="bg-orange-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-orange-500/20 relative">
                    <span>2</span>
                    <span className="absolute -top-1 -right-1 bg-background rounded-full p-1">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                    </span>
                  </div>
                  <Card className="w-full bg-background border-orange-500/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Secure Verification</h3>
                      <p className="text-muted-foreground">Our system securely fetches the certificate details from our database.</p>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
              
              {/* Step 3 */}
              <Fade direction="right" triggerOnce={true} delay={700} cascade>
                <div className="flex flex-col items-center relative z-10">
                  <div className="bg-orange-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-orange-500/20 relative">
                    <span>3</span>
                    <span className="absolute -top-1 -right-1 bg-background rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </span>
                  </div>
                  <Card className="w-full bg-background border-orange-500/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">View Certificate Status</h3>
                      <p className="text-muted-foreground">Instantly view the certificate's authenticity and complete details.</p>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* Features Section with animated cards */}
        <section className="py-20 px-4 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
          
          <div className="container mx-auto relative z-10">
            <Fade direction="up" triggerOnce={true} delay={200}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                <Separator className="w-24 h-1 bg-orange-500 mx-auto" />
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Our certificate verification system offers powerful features to ensure trust and reliability.</p>
              </div>
            </Fade>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Zoom triggerOnce={true} delay={300} cascade>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-orange-500/30">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Clock className="h-20 w-20 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Fast Verification</h3>
                    <p className="text-muted-foreground">Get instant results with our optimized verification process that takes just seconds to complete.</p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-orange-500/30">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Globe className="h-20 w-20 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">24/7 Availability</h3>
                    <p className="text-muted-foreground">Verify certificates anytime, anywhere, on any device with our responsive platform.</p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-orange-500/30">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Shield className="h-20 w-20 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">Trust & Security</h3>
                    <p className="text-muted-foreground">Our system ensures the authenticity and integrity of all certificate records with advanced security.</p>
                  </CardContent>
                </Card>
              </Zoom>
            </div>
          </div>
        </section>

        {/* About TechCognita Section with animation */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-card rounded-xl p-8 shadow-lg border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full -ml-20 -mb-20" />
              
              <Fade triggerOnce={true} delay={200}>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 blur-xl opacity-30 animate-pulse" />
                      <div className="relative bg-background rounded-full p-6 border-2 border-orange-500/20">
                        <BookOpen className="h-20 w-20 text-orange-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">About TechCognita</h2>
                    <p className="text-lg text-muted-foreground mb-4">TechCognita is a leading provider of technology education and certification. We are committed to excellence in professional development and ensuring the credibility of our certifications.</p>
                    <p className="text-muted-foreground">This verification system is part of our effort to maintain the highest standards of trust and authenticity in the credentials we issue.</p>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with animation */}
      <Fade triggerOnce={true} delay={200}>
        <footer className="py-8 px-4 bg-muted/80 border-t border-border/50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-orange-500" />
                <p className="font-semibold">TechCognita</p>
              </div>
              
              <p className="text-sm text-muted-foreground">&copy; 2025 TechCognita. All rights reserved.</p>
              
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </a>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Fade>
    </div>
  );
}

export default LandingPage;