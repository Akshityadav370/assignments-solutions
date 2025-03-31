import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { roomColors } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

const Home = () => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const onSubmit = () => {
    console.log(name, selectedColor);
    if (name && selectedColor) {
      window.location.href = `/room?name=${name}&roomId=${selectedColor}`;
      setName('');
      setSelectedColor('');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className='flex h-screen w-full items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400'>
      <Card className='w-[400px]'>
        <CardHeader className='text-center'>
          <CardTitle>Welcome to the Chat Room</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='grid w-full items-center gap-6'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Your Name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='flex flex-col space-y-3'>
              <Label>Choose a Color</Label>
              <div className='flex justify-between items-center'>
                {Object.entries(roomColors).map(([key, color]) => (
                  <div
                    key={key}
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                      selectedColor === key
                        ? 'border-black'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(key)}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <Button onClick={onSubmit} className='mx-auto'>
            Join
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
