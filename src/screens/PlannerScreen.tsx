
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PlannerScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Tomar vitaminas", completed: false },
    { id: 2, text: "10 minutos de meditação", completed: true },
    { id: 3, text: "Escrever no diário", completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [intention, setIntention] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-gray-600 hover:text-[#A75C3F]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="text-center">
              <h1 className="font-lora text-xl font-bold text-[#3C3C3C]">
                Planner 📋
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Organize seu dia com intenção
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 border-blue-200">
          <h2 className="font-lora text-lg font-semibold text-[#3C3C3C] mb-4">
            Intenção do Dia 💫
          </h2>
          <Textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Qual é sua intenção para hoje?"
            className="min-h-[80px] border-blue-200 focus:border-blue-400"
          />
        </Card>

        <Card className="p-6 border-blue-200">
          <h2 className="font-lora text-lg font-semibold text-[#3C3C3C] mb-4">
            Tarefas de Autocuidado ✨
          </h2>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicionar nova tarefa..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask} size="sm" className="bg-[#A75C3F] hover:bg-[#8B4A36]">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <Button
                  onClick={() => toggleTask(task.id)}
                  size="sm"
                  variant={task.completed ? "default" : "outline"}
                  className={task.completed ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlannerScreen;
