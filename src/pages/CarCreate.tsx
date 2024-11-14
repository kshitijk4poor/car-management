import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createCar } from '../lib/api';
import Button from '../components/Button';
import Input from '../components/Input';

interface CarForm {
  title: string;
  description: string;
  tags: string;
  images: string;
  imageFiles: FileList;
}

export default function CarCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarForm>();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [urlCount, setUrlCount] = useState(0);

  const createCarMutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      toast.success('Car created successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to create car. Please try again.');
    },
  });

  const onSubmit = async (data: CarForm) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('tags', JSON.stringify(data.tags.split(',').map(tag => tag.trim())));
      
      const urlImages = data.images ? data.images.split(',').map(url => url.trim()).filter(Boolean) : [];
      formData.append('urlImages', JSON.stringify(urlImages));
      
      if (selectedFiles) {
        Array.from(selectedFiles).forEach(file => {
          formData.append('imageFiles', file);
        });
      }
      
      await createCarMutation.mutateAsync(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Add New Car</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Title"
          {...register('title', {
            required: 'Title is required',
          })}
          error={errors.title?.message}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
          {errors.description?.message && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <Input
          label="Tags (comma-separated)"
          placeholder="luxury, sedan, automatic"
          {...register('tags', {
            required: 'At least one tag is required',
          })}
          error={errors.tags?.message}
        />
        <Input
          label="Image URLs (comma-separated)"
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          {...register('images', {
            validate: (value) => {
              const urlCount = value ? value.split(',').filter(url => url.trim()).length : 0;
              setUrlCount(urlCount);
              const totalImages = urlCount + (selectedFiles?.length || 0);
              return totalImages <= 10 || 'Total number of images cannot exceed 10';
            }
          })}
          error={errors.images?.message}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Upload Images ({10 - urlCount} remaining)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const totalImages = urlCount + files.length;
                if (totalImages > 10) {
                  e.target.value = '';
                  toast.error(`Can only add ${10 - urlCount} more images`);
                  return;
                }
                setSelectedFiles(files);
              }
            }}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Car
          </Button>
        </div>
      </form>
    </div>
  );
}