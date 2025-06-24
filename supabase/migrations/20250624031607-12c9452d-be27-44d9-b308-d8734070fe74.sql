
-- Criar tabela para gerenciar assinaturas premium
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive', -- active, inactive, canceled, past_due
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Criar tabela para conteúdos premium mensais
CREATE TABLE public.premium_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month_year TEXT NOT NULL, -- formato: "2024-01", "2024-02"
  title TEXT NOT NULL,
  description TEXT,
  audio_files TEXT[], -- array de URLs dos áudios
  challenge_title TEXT,
  challenge_description TEXT,
  menu_content JSONB, -- cardápio simbólico
  live_video_url TEXT,
  live_title TEXT,
  community_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(month_year)
);

-- Criar tabela para progresso dos desafios
CREATE TABLE public.challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month_year TEXT NOT NULL,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
  completed BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year, day_number)
);

-- Criar tabela para diário de bordo
CREATE TABLE public.board_journal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month_year TEXT NOT NULL,
  cycle_notes TEXT,
  emotional_state TEXT,
  reflections TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_journal ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para subscriptions
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Insert subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (true);

-- Políticas RLS para premium_content (todos usuários premium podem ver)
CREATE POLICY "Premium users can view content" ON public.premium_content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Políticas RLS para challenge_progress
CREATE POLICY "Users can manage their own progress" ON public.challenge_progress
  FOR ALL USING (user_id = auth.uid());

-- Políticas RLS para board_journal
CREATE POLICY "Users can manage their own journal" ON public.board_journal
  FOR ALL USING (user_id = auth.uid());

-- Inserir alguns conteúdos de exemplo
INSERT INTO public.premium_content (month_year, title, description, audio_files, challenge_title, challenge_description, menu_content, live_video_url, live_title, community_link) VALUES
('2024-01', 'Janeiro - Renovação Interior', 'Começe o ano com uma jornada de autoconhecimento profundo', 
 ARRAY['/content/premium/2024-01/audio-1.mp3', '/content/premium/2024-01/audio-2.mp3', '/content/premium/2024-01/audio-3.mp3'],
 'Desafio da Gratidão', 'Durante 7 dias, pratique gratidão consciente e registre 3 momentos especiais por dia',
 '{"breakfast": "Chá de camomila com mel", "reflection": "Momento de gratidão matinal", "evening": "Journaling antes de dormir"}',
 '/content/premium/2024-01/live-janeiro.mp4',
 'Live: Rituais de Renovação para o Ano Novo',
 'https://t.me/+exemplo_comunidade_janeiro'
),
('2024-02', 'Fevereiro - Amor Próprio', 'Cultive o relacionamento mais importante: consigo mesma',
 ARRAY['/content/premium/2024-02/audio-1.mp3', '/content/premium/2024-02/audio-2.mp3', '/content/premium/2024-02/audio-3.mp3'],
 'Desafio do Autocuidado', '7 dias de práticas gentis consigo mesma, celebrando sua essência única',
 '{"morning": "Afirmações positivas no espelho", "afternoon": "Pausa para respirar", "evening": "Banho relaxante com óleos"}',
 '/content/premium/2024-02/live-fevereiro.mp4',
 'Live: Construindo uma Relação Amorosa Consigo',
 'https://t.me/+exemplo_comunidade_fevereiro'
);
