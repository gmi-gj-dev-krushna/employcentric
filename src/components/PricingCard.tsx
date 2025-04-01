
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Feature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: Feature[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  ctaLink: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  buttonVariant = "outline",
  ctaLink
}: PricingCardProps) => {
  return (
    <Card className={cn(
      "border-border transition-all duration-200 hover:shadow-lg relative", 
      isPopular && "border-primary scale-105 shadow-md"
    )}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-4xl font-bold">${price}</span>
            <span className="ml-1 text-muted-foreground">/ user / month</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button 
            className="w-full" 
            variant={buttonVariant}
            asChild
          >
            <Link to={ctaLink}>
              {buttonText}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
