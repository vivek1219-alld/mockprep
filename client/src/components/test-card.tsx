import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, BarChart, Users, Star } from "lucide-react";

interface TestCardProps {
  test: any;
  onTake: () => void;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onTake }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{test.title}</CardTitle>
          {test.free ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Free</Badge>
          ) : (
            <Badge variant="outline">Premium</Badge>
          )}
        </div>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{test.duration} mins</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-gray-500" />
            <span>{test.questions} questions</span>
          </div>
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-2 text-gray-500" />
            <span>{test.difficulty} difficulty</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{test.attempts.toLocaleString()} attempts</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star key={starIndex} className="h-4 w-4" fill={starIndex <= Math.floor(test.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{test.rating}</span>
          </div>
          <Button onClick={onTake}>Take Test</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestCard;