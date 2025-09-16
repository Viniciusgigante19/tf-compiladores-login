import TodoModel from '../../app/Models/TodoModel.js';

export default {

    up: async () => {


        // Todos

        await TodoModel.bulkCreate([
            { title: 'Revisar proposta de orçamento', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Enviar relatório semanal', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Atualizar perfil no sistema', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Agendar reunião com cliente', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Organizar arquivos da equipe', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Registrar feedback do cliente', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Cadastrar nova tarefa no CRM', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Atualizar metas trimestrais', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Preparar apresentação do projeto', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Responder e-mails pendentes', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Fazer backup dos documentos', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Atualizar planilha financeira', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Pesquisar fornecedores novos', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Criar rascunho da campanha de marketing', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Testar integração com API externa', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Configurar ambiente de homologação', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Revisar documentação técnica', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Elaborar cronograma de tarefas', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Acompanhar métricas de vendas', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Treinar equipe em novo processo', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Analisar contratos vigentes', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Criar checklist de qualidade', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Preparar ata da última reunião', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Atualizar inventário de equipamentos', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Publicar comunicado interno', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Agendar treinamento externo', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Consolidar feedbacks da equipe', id_user: Math.floor(Math.random() * 6) + 1 },
            { title: 'Monitorar concorrência', id_user: Math.floor(Math.random() * 6) + 1 }
        ]);

    },

    down: async () => {
        await TodoModel.destroy({
            where: {
                title: [
                    'Revisar proposta de orçamento',
                    'Enviar relatório semanal',
                    'Atualizar perfil no sistema',
                    'Agendar reunião com cliente',
                    'Organizar arquivos da equipe',
                    'Registrar feedback do cliente',
                    'Cadastrar nova tarefa no CRM',
                    'Atualizar metas trimestrais',
                    'Preparar apresentação do projeto',
                    'Responder e-mails pendentes',
                    'Fazer backup dos documentos',
                    'Atualizar planilha financeira',
                    'Pesquisar fornecedores novos',
                    'Criar rascunho da campanha de marketing',
                    'Testar integração com API externa',
                    'Configurar ambiente de homologação',
                    'Revisar documentação técnica',
                    'Elaborar cronograma de tarefas',
                    'Acompanhar métricas de vendas',
                    'Treinar equipe em novo processo',
                    'Analisar contratos vigentes',
                    'Criar checklist de qualidade',
                    'Preparar ata da última reunião',
                    'Atualizar inventário de equipamentos',
                    'Publicar comunicado interno',
                    'Agendar treinamento externo',
                    'Consolidar feedbacks da equipe',
                    'Monitorar concorrência'
                ]

            }
        });
    }
};
