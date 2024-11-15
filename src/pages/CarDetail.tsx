import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Edit, Trash2, ChevronLeft } from 'lucide-react';
import { getCar, deleteCar } from '../lib/api';
import Button from '../components/Button';
import ImageCarousel from '../components/ImageCarousel';
import { motion } from 'framer-motion';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCar(id!),
  });

  const deleteCarMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success('Car deleted successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to delete car. Please try again.');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!car) return <div>Car not found</div>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await deleteCarMutation.mutateAsync(id!);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Cars</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ImageCarousel images={car.images} title={car.title} />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            <div className="flex space-x-2">
              <Link to={`/cars/${id}/edit`}>
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Edit className="h-5 w-5" />
                  <span>Edit</span>
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </Button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-6"
          >
            {car.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {car.tags.map((tag: any, index: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}