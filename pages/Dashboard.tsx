
import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { 
  Wallet, 
  Clock, 
  AlertCircle, 
  ArrowRightLeft, 
  TrendingUp,
  Banknote
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { getDashboardData, gros, extern, offres } = useAppStore();
  const data = getDashboardData();

  const kpis = [
    { label: 'Encaisse Réel', value: data.encaisse_reel, icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Profit Attendu', value: data.profit_attendu, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pertes (Retours)', value: data.pertes, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Net Offres (Frais)', value: data.net_offres, icon: ArrowRightLeft, color: data.net_offres >= 0 ? 'text-emerald-600' : 'text-orange-600', bg: data.net_offres >= 0 ? 'bg-emerald-50' : 'bg-orange-50' },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' }).format(val);
  };

  const chartData = useMemo(() => [
    { name: 'Encaisse', value: data.encaisse_reel, fill: '#10b981' },
    { name: 'Attendu', value: data.profit_attendu, fill: '#3b82f6' },
    { name: 'Pertes', value: data.pertes, fill: '#ef4444' },
  ], [data]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Tableau de bord</h2>
        <p className="text-slate-500">Vue d'ensemble de la santé financière du business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={kpi.color} size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
            <h3 className="text-xl font-bold text-slate-900">{formatCurrency(kpi.value)}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Profit Net Final</p>
            <h3 className={`text-4xl font-black ${data.profit_net_final >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
              {formatCurrency(data.profit_net_final)}
            </h3>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
              <TrendingUp size={14} /> Total Business
            </span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">Volume de Commandes</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Commandes Gros</span>
              <span className="font-bold text-slate-900">{gros.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Commandes Détail</span>
              <span className="font-bold text-slate-900">{extern.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Total Mouvements Frais</span>
              <span className="font-bold text-slate-900">{offres.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <h4 className="font-bold text-slate-800 mb-2">Répartition Cash</h4>
              <p className="text-sm text-slate-500 mb-4">Ratio Encaisse vs Attendu</p>
              <div className="h-[180px] w-[180px] mx-auto">
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Encaissé', value: data.encaisse_reel },
                        { name: 'Attendu', value: data.profit_attendu }
                      ]}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
