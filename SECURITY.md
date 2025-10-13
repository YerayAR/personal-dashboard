# Security Policy

## Supported Versions

This project is actively maintained and security updates are provided for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of FinDash seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us responsibly.

⚠️ **IMPORTANT**: This is a personal finance dashboard that handles sensitive financial data. Please report security issues immediately.

### How to Report

1. **Email**: Send details to security@findash.dev
2. **GitHub Security Advisory**: Create a private security advisory on GitHub
3. **Response Time**: We aim to respond within 24 hours for financial data security issues

### What to Include

Please include the following information in your report:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact on financial data security
- Any suggested fixes or mitigations
- Your contact information for follow-up

### What to Expect

1. **Acknowledgment**: We'll acknowledge receipt of your report within 24 hours
2. **Investigation**: We'll investigate the issue and determine its severity
3. **Fix Development**: We'll develop and test a fix with high priority
4. **Disclosure**: We'll coordinate responsible disclosure with you
5. **Credit**: We'll credit you in our security acknowledgments (if desired)

## Security Best Practices

This project implements several security measures for financial data protection:

### Infrastructure Security
- **Secure Docker containers** with non-root users and minimal capabilities
- **Network isolation** with custom Docker networks
- **Resource limits** to prevent DoS attacks
- **Health checks** for monitoring and automatic recovery
- **Secure MongoDB configuration** with authentication

### Application Security
- **Input validation** and sanitization for all financial data
- **Rate limiting** to prevent abuse
- **Secure session management**
- **Data encryption** at rest and in transit
- **Access logging** for audit trails

### Financial Data Protection
- **Database encryption** with secure credentials
- **Backup encryption** for financial data
- **Export security** for financial reports
- **Data retention policies** for compliance
- **PII protection** in logs and exports

## Data Security Guidelines

### For Users
- Use strong, unique passwords
- Enable two-factor authentication (when available)
- Regularly review your financial data for anomalies
- Keep your browser and system updated
- Log out completely when finished

### For Contributors
- Never commit financial test data
- Use environment variables for all secrets
- Validate all financial calculations
- Sanitize all user inputs
- Follow secure coding practices
- Test security features thoroughly

## Financial Data Handling

- All financial data is stored with encryption
- Database connections use TLS/SSL
- Backups are encrypted and secured
- Export files are generated securely
- PII is masked in logs and error messages
- Data retention follows privacy regulations

## Infrastructure Security

### Docker Security
- Non-root containers with minimal privileges
- Read-only filesystems where possible
- Resource limits to prevent resource exhaustion
- Network segmentation between services
- Regular security updates for base images

### Database Security
- Authentication required for all connections
- Encrypted connections (TLS)
- Regular automated backups
- Access logging and monitoring
- Query validation and sanitization

## Contact

For security-related questions or concerns, please contact:
- **Critical Issues**: security@findash.dev
- **General Security**: Create a private security advisory on GitHub

**Response Times:**
- Critical financial data security: 24 hours
- High severity: 48 hours
- Medium/Low severity: 1 week

Thank you for helping keep FinDash and users' financial data secure!