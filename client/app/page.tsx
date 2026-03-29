"use client";

import { useEffect, useMemo, useState } from 'react';
import { FormEvent } from 'react';
import { City, Department, UserResponse, DepartmentFilter } from '../lib/types';
import { loginAction } from '../lib/actions/auth.actions';
import { createCityAction, deleteCityAction, loadCitiesByFilterAction, refreshDashboardDataAction, updateCityAction } from '../lib/actions/city.actions';
import { createDepartmentAction, deleteDepartmentAction, updateDepartmentAction } from '../lib/actions/department.actions';

type Notice = {
  kind: 'success' | 'error' | 'info';
  text: string;
};

export default function Home() {
  const [token, setToken] = useState('');
  const [loggedUser, setLoggedUser] = useState<UserResponse | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>('all');

  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [newCityDepartmentId, setNewCityDepartmentId] = useState<string>('');

  const [editingDepartmentId, setEditingDepartmentId] = useState<number | null>(null);
  const [editingDepartmentName, setEditingDepartmentName] = useState('');

  const [editingCityId, setEditingCityId] = useState<number | null>(null);
  const [editingCityName, setEditingCityName] = useState('');
  const [editingCityDepartmentId, setEditingCityDepartmentId] = useState<string>('');

  async function refreshData(
    currentToken: string,
    selectedDepartmentFilter: DepartmentFilter = departmentFilter,
  ) {
    const result = await refreshDashboardDataAction(currentToken, selectedDepartmentFilter);

    if (result.effectiveFilter !== selectedDepartmentFilter) {
      setDepartmentFilter(result.effectiveFilter);
    }

    setDepartments(result.departments);
    setCities(result.cities);

    if (!newCityDepartmentId && result.departments.length > 0) {
      setNewCityDepartmentId(String(result.departments[0].id));
    }
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem('token');
    const savedUser = window.localStorage.getItem('user');

    if (!savedToken) {
      return;
    }

    setToken(savedToken);

    if (savedUser) {
      setLoggedUser(JSON.parse(savedUser) as UserResponse);
    }

    refreshDashboardDataAction(savedToken, 'all')
      .then((result) => {
        setDepartments(result.departments);
        setCities(result.cities);
        if (result.departments.length > 0) {
          setNewCityDepartmentId((previousDepartmentId) => {
            if (previousDepartmentId) {
              return previousDepartmentId;
            }

            return String(result.departments[0].id);
          });
        }
      })
      .catch(() => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setToken('');
        setLoggedUser(null);
        setDepartments([]);
        setCities([]);
        setNotice({ kind: 'error', text: 'Sesion expirada, inicia sesion nuevamente.' });
      });
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      const result = await loginAction({
        email: loginEmail,
        password: loginPassword,
      });

      window.localStorage.setItem('token', result.token);
      window.localStorage.setItem('user', JSON.stringify(result.user));

      setToken(result.token);
      setLoggedUser(result.user);
      await refreshData(result.token);

      setNotice({ kind: 'success', text: 'Sesion iniciada.' });
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');

    setToken('');
    setLoggedUser(null);
    setDepartments([]);
    setCities([]);
    setDepartmentFilter('all');
    setNotice({ kind: 'info', text: 'Sesion cerrada.' });
  }

  async function handleLoadData() {
    setLoading(true);
    setNotice(null);

    try {
      await refreshData(token);
      setNotice({ kind: 'success', text: 'Datos actualizados.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleDepartmentFilterChange(value: DepartmentFilter) {
    setDepartmentFilter(value);
    setLoading(true);
    setNotice(null);

    try {
      const cityData = await loadCitiesByFilterAction(token, value);
      setCities(cityData);
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateDepartment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      await createDepartmentAction({ name: newDepartmentName }, token || undefined);
      await refreshData(token);
      setNewDepartmentName('');
      setNotice({ kind: 'success', text: 'Departamento creado.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateDepartment(id: number) {
    if (!editingDepartmentName.trim()) {
      setNotice({ kind: 'error', text: 'El nombre del departamento es requerido.' });
      return;
    }

    setLoading(true);
    setNotice(null);

    try {
      await updateDepartmentAction(id, { name: editingDepartmentName }, token || undefined);
      await refreshData(token);
      setEditingDepartmentId(null);
      setEditingDepartmentName('');
      setNotice({ kind: 'success', text: 'Departamento actualizado.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteDepartment(id: number) {
    setLoading(true);
    setNotice(null);

    try {
      await deleteDepartmentAction(id, token || undefined);
      await refreshData(token);
      setNotice({ kind: 'success', text: 'Departamento eliminado.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedDepartmentId = Number(newCityDepartmentId);
    if (!parsedDepartmentId) {
      setNotice({ kind: 'error', text: 'Selecciona un departamento para la ciudad.' });
      return;
    }

    setLoading(true);
    setNotice(null);

    try {
      await createCityAction(
        {
          name: newCityName,
          department_id: parsedDepartmentId,
        },
        token || undefined,
      );

      await refreshData(token);
      setNewCityName('');
      setNotice({ kind: 'success', text: 'Ciudad creada.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCity(id: number) {
    const parsedDepartmentId = Number(editingCityDepartmentId);

    setLoading(true);
    setNotice(null);

    try {
      await updateCityAction(
        id,
        {
          name: editingCityName,
          department_id: parsedDepartmentId || undefined,
        },
        token || undefined,
      );

      await refreshData(token);
      setEditingCityId(null);
      setEditingCityName('');
      setEditingCityDepartmentId('');
      setNotice({ kind: 'success', text: 'Ciudad actualizada.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCity(id: number) {
    setLoading(true);
    setNotice(null);

    try {
      await deleteCityAction(id, token || undefined);
      await refreshData(token);
      setNotice({ kind: 'success', text: 'Ciudad eliminada.' });
    } catch (error) {
      setNotice({ kind: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  const departmentMap = useMemo(() => {
    return departments.reduce<Record<number, string>>((acc, department) => {
      acc[department.id] = department.name;
      return acc;
    }, {});
  }, [departments]);

  if (!token) {
    return (
      <div className="page-shell">
        <div className="" />
        <div className="" />

        <main className="dashboard-grid">
          <section className="card card--hero">
            <h1>Iniciar sesion</h1>
            <form onSubmit={handleLogin} className="form-stack" style={{ maxWidth: 420 }}>
              <input
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                type="email"
                placeholder="Correo"
                required
              />
              <input
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
                minLength={6}
                placeholder="Password"
                required
              />
              <button type="submit" disabled={loading}>
                Entrar
              </button>
            </form>

            {notice && <div className={`notice notice--${notice.kind}`}>{notice.text}</div>}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="" />
      <div className="" />

      <main className="dashboard-grid">
        <section className="card card--hero">
          <div className="inline-actions">
            <button type="button" onClick={handleLoadData} disabled={loading}>
              Cargar datos
            </button>
            <button type="button" onClick={handleLogout} disabled={loading} className="ghost">
              Cerrar sesion
            </button>
          </div>

          {loggedUser && (
            <div className="user-chip">
              <strong>{loggedUser.name}</strong>
              <span>{loggedUser.email}</span>
            </div>
          )}

          {notice && <div className={`notice notice--${notice.kind}`}>{notice.text}</div>}
        </section>

        <section className="card">
          <h2>Departamentos</h2>
          <form onSubmit={handleCreateDepartment} className="inline-form">
            <input
              value={newDepartmentName}
              onChange={(event) => setNewDepartmentName(event.target.value)}
              placeholder="Nuevo departamento"
              required
            />
            <button type="submit" disabled={loading}>
              Crear
            </button>
          </form>

          <ul className="entity-list">
            {departments.map((department) => (
              <li key={department.id}>
                {editingDepartmentId === department.id ? (
                  <>
                    <input
                      value={editingDepartmentName}
                      onChange={(event) => setEditingDepartmentName(event.target.value)}
                    />
                    <button type="button" onClick={() => handleUpdateDepartment(department.id)} disabled={loading}>
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDepartmentId(null);
                        setEditingDepartmentName('');
                      }}
                      className="ghost"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{department.name}</strong>
                      <small>ID {department.id}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDepartmentId(department.id);
                        setEditingDepartmentName(department.name);
                      }}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDepartment(department.id)}
                      disabled={loading}
                      className="danger"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Ciudades</h2>

          <form onSubmit={handleCreateCity} className="inline-form inline-form--wide">
            <input
              value={newCityName}
              onChange={(event) => setNewCityName(event.target.value)}
              placeholder="Nueva ciudad"
              required
            />
            <select
              value={newCityDepartmentId}
              onChange={(event) => setNewCityDepartmentId(event.target.value)}
              required
            >
              <option value="">Departamento</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <button type="submit" disabled={loading}>
              Crear
            </button>
          </form>

          <div className="filter-row">
            <label htmlFor="city-filter">Filtrar por departamento</label>
            <select
              id="city-filter"
              value={departmentFilter}
              onChange={(event) => {
                void handleDepartmentFilterChange(event.target.value as DepartmentFilter);
              }}
            >
              <option value="all">Todos</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <ul className="entity-list">
            {cities.map((city) => (
              <li key={city.id}>
                {editingCityId === city.id ? (
                  <>
                    <input value={editingCityName} onChange={(event) => setEditingCityName(event.target.value)} />
                    <select
                      value={editingCityDepartmentId}
                      onChange={(event) => setEditingCityDepartmentId(event.target.value)}
                    >
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={() => handleUpdateCity(city.id)} disabled={loading}>
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCityId(null);
                        setEditingCityName('');
                        setEditingCityDepartmentId('');
                      }}
                      className="ghost"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{city.name}</strong>
                      <small>{departmentMap[city.department_id] || `Departamento ${city.department_id}`}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCityId(city.id);
                        setEditingCityName(city.name);
                        setEditingCityDepartmentId(String(city.department_id));
                      }}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCity(city.id)}
                      disabled={loading}
                      className="danger"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
