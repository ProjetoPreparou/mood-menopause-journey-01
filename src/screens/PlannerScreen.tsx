
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Check, Star, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const PlannerScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Tomar vitaminas", completed: false, priority: "alta" },
    { id: 2, text: "10 minutos de meditação", completed: true, priority: "alta" },
    { id: 3, text: "Escrever no diário", completed: false, priority: "média" },
    { id: 4, text: "Caminhada de 15 minutos", completed: false, priority: "baixa" }
  ]);
  const [newTask, setNewTask] = useState('');
  const [intention, setIntention] = useState('');
  const [gratitude, setGratitude] = useState(['', '', '']);

  const handleGoBack = () => {
    navigate('/premium');
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        priority: "média" 
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

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
                Planner Premium 📋
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                {today}
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        {/* Progress Overview */}
        <Card className="p-6 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-lora text-lg font-semibold text-[#3C3C3C]">
                Progresso do Dia
              </h2>
              <p className="font-nunito text-sm text-gray-600">
                {completedTasks} de {tasks.length} tarefas concluídas
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#A75C3F]">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div 
              className="bg-[#A75C3F] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>

        {/* Intention of the Day */}
        <Card className="p-6 border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-[#A75C3F]" />
            <h2 className="font-lora text-lg font-semibold text-[#3C3C3C]">
              Intenção do Dia 💫
            </h2>
          </div>
          <Textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Qual é sua intenção para hoje? Como quer se sentir?"
            className="min-h-[80px] border-blue-200 focus:border-blue-400"
          />
        </Card>

        {/* Daily Tasks */}
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
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <Button
                  onClick={() => toggleTask(task.id)}
                  size="sm"
                  variant={task.completed ? "default" : "outline"}
                  className={task.completed ? "bg-green-500 hover:bg-green-600" : "hover:border-[#A75C3F]"}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    task.priority === 'alta' ? 'border-red-300 text-red-700' :
                    task.priority === 'média' ? 'border-yellow-300 text-yellow-700' :
                    'border-gray-300 text-gray-700'
                  }`}
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Gratitude Section */}
        <Card className="p-6 border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-[#A75C3F]" />
            <h2 className="font-lora text-lg font-semibold text-[#3C3C3C]">
              3 Gratidões do Dia 🙏
            </h2>
          </div>
          <div className="space-y-3">
            {gratitude.map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => updateGratitude(index, e.target.value)}
                placeholder={`Gratidão ${index + 1}...`}
                className="border-blue-200 focus:border-blue-400"
              />
            ))}
          </div>
        </Card>

        {/* Premium Tip */}
        <Card className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-[#3C3C3C] text-sm mb-2">
              🌟 Dica Premium
            </h3>
            <p className="font-nunito text-gray-600 text-sm">
              Complete pelo menos 3 tarefas por dia para manter o ritmo de autocuidado. 
              Pequenos passos levam a grandes transformações!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlannerScreen;
